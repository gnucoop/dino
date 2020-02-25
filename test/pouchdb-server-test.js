var PouchDB        = require('pouchdb');
var express        = require('express');
var corser         = require('corser');
var bodyParser     = require('body-parser');
var expressPouchDB = require('express-pouchdb');
var tmp            = require('tmp');
var fs             = require('fs');
var uuid           = require('uuid');

var InMemPouchDB = PouchDB.defaults({db: require('memdown')});

var logPath = tmp.tmpNameSync() + '.log';
var configPath = tmp.tmpNameSync() + '.json';
fs.writeFileSync(configPath, '{"couchdb": {"uuid": "' + uuid.v4() + '"}}');

var cors = function (config) {
  var corsMiddleware;
  function corsChanged() {
    if (config.get('httpd', 'enable_cors')) {
      var origins = config.get('cors', 'origins');
      if (origins === '*') {
        origins = undefined;
      }
      if (origins) {
        origins = origins.split(', ');
      }

      corsMiddleware = corser.create({
        methods: config.get('cors', 'methods').split(', '),
        supportsCredentials: config.get('cors', 'credentials'),
        requestHeaders: config.get('cors', 'headers').split(', '),
        origins: origins
      });
    } else {
      corsMiddleware = null;
    }
  }

  [
    ['httpd', 'enable_cors', true],
    ['cors', 'credentials', true],
    ['cors', 'methods', 'GET, HEAD, POST, PUT, DELETE, COPY'],
    ['cors', 'origins', '*'],
    ['cors', 'headers', corser.simpleRequestHeaders.concat([
      'Authorization', 'Origin', 'Referer'
    ]).join(', ')],
  ].forEach(function (info) {
    config.registerDefault.apply(config, info);
    config.on(info[0] + '.' + info[1], corsChanged);
  });
  corsChanged();

  return function (req, res, next) {
    if (!corsMiddleware) {
      return next();
    }
    corsMiddleware(req, res, next);
  };
};

var app = express();
var pouchDBApp = expressPouchDB(InMemPouchDB, {
  logPath, configPath
});

console.log('[PouchDB server] Starting with config ' + configPath);
console.log('[PouchDB server] Logging to ' + logPath);

var config = pouchDBApp.couchConfig;

app.use(cors(config));

app.use('/data/:db/_bulk_docs', bodyParser.json());

app.post('/data/:db/_bulk_docs', function( req, res ) {
  var dbName = req.params.db;
  var curDb = new InMemPouchDB(dbName);
  curDb.allDocs({include_docs: true}).then(r => {
    var docs = r.rows
      .sort((r1, r2) => parseInt(r2.id.substring(2), 16) - parseInt(r1.id.substring(2), 16))
      .map(r => r.id);
    var updDocs = req.body.docs.filter(d =>
      docs.includes(d._id)).sort((d1, d2) => parseInt(d1._id.substring(2), 16) - parseInt(d2._id.substring(2), 16));
    if (docs.length > 0 && updDocs.length > 0) {
      var nextId = (parseInt(docs[0].substring(2), 16) + 1).toString();
      var r = updDocs.map(d => {
        return {
          id: d._id,
          error: 'conflict',
          reason: {
            first_conflicting_id: updDocs[0]._id,
            existent_id: true,
            next_id: nextId
          },
          message: {
            first_conflicting_id: updDocs[0]._id,
            existent_id: true,
            next_id: nextId
          }
        }
      });
      res.status(201);
      res.send(JSON.stringify(r));
    } else {
      curDb.bulkDocs(req.body.docs, {new_edits: req.body.new_edits})
        .then(r => res.send(JSON.stringify(r)));
    }
  });
});
app.use('/data', pouchDBApp);

app.listen(5984);
