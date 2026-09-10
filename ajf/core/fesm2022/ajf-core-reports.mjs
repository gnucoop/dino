import * as i0 from '@angular/core';
import { Directive, Input, Pipe, ChangeDetectionStrategy, ViewEncapsulation, Component, NgModule, isDevMode, ViewChild } from '@angular/core';
import { buildStringIdentifier } from '@ajf/core/common';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';
import { utils, writeFile } from 'xlsx';
import { AjfFormulaSerializer, alwaysCondition, AjfConditionSerializer, evaluateExpression, createFormula } from '@ajf/core/models';
import { deepCopy } from '@ajf/core/utils';
import { AjfFormSerializer, AjfNodeType, AjfFieldType } from '@ajf/core/forms';
import { of, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { AjfImageType } from '@ajf/core/image';
import { createPdf } from '@ajf/core/pdfmake';
import { PageOrientation, Packer, Document, Paragraph, ImageRun, AlignmentType, PageBreak, HeadingLevel, UnderlineType, TextRun, Table, TableRow, TableCell } from 'docx';

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
class AjfBaseWidgetComponent {
    get instance() {
        return this._instance;
    }
    set instance(instance) {
        if (this._instance !== instance) {
            this._instance = instance;
            this._cdr.detectChanges();
        }
    }
    constructor(_cdr, el) {
        this._cdr = _cdr;
        this.el = el;
    }
    static { this.ɵfac = function AjfBaseWidgetComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfBaseWidgetComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.ElementRef)); }; }
    static { this.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: AjfBaseWidgetComponent, inputs: { instance: "instance" } }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfBaseWidgetComponent, [{
        type: Directive
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], { instance: [{
            type: Input
        }] }); })();

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
// tslint:disable-next-line:prefer-const-enum
var AjfChartType;
(function (AjfChartType) {
    AjfChartType[AjfChartType["Line"] = 0] = "Line";
    AjfChartType[AjfChartType["Bar"] = 1] = "Bar";
    AjfChartType[AjfChartType["HorizontalBar"] = 2] = "HorizontalBar";
    AjfChartType[AjfChartType["Radar"] = 3] = "Radar";
    AjfChartType[AjfChartType["Scatter"] = 4] = "Scatter";
    AjfChartType[AjfChartType["Doughnut"] = 5] = "Doughnut";
    AjfChartType[AjfChartType["Pie"] = 6] = "Pie";
    AjfChartType[AjfChartType["PolarArea"] = 7] = "PolarArea";
    AjfChartType[AjfChartType["Bubble"] = 8] = "Bubble";
    AjfChartType[AjfChartType["LENGTH"] = 9] = "LENGTH";
})(AjfChartType || (AjfChartType = {}));

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
function chartToChartJsType(chartType) {
    switch (chartType) {
        case AjfChartType.Line:
            return 'line';
        case AjfChartType.Bar:
            return 'bar';
        case AjfChartType.HorizontalBar:
            return 'horizontalBar';
        case AjfChartType.Radar:
            return 'radar';
        case AjfChartType.Scatter:
            return 'scatter';
        case AjfChartType.Doughnut:
            return 'doughnut';
        case AjfChartType.Pie:
            return 'pie';
        case AjfChartType.PolarArea:
            return 'polarArea';
        case AjfChartType.Bubble:
            return 'bubble';
        default:
            return 'line';
    }
}

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
class AjfGetColumnContentPipe {
    transform(instance, column) {
        return column >= 0 && column < instance.content.length ? instance.content[column] : null;
    }
    static { this.ɵfac = function AjfGetColumnContentPipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfGetColumnContentPipe)(); }; }
    static { this.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ajfGetColumnContent", type: AjfGetColumnContentPipe, pure: true }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfGetColumnContentPipe, [{
        type: Pipe,
        args: [{ name: 'ajfGetColumnContent' }]
    }], null, null); })();

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
// tslint:disable-next-line:prefer-const-enum
var AjfAggregationType;
(function (AjfAggregationType) {
    AjfAggregationType[AjfAggregationType["None"] = 0] = "None";
    AjfAggregationType[AjfAggregationType["Sum"] = 1] = "Sum";
    AjfAggregationType[AjfAggregationType["Average"] = 2] = "Average";
    AjfAggregationType[AjfAggregationType["WeightedAverage"] = 3] = "WeightedAverage";
    AjfAggregationType[AjfAggregationType["LENGTH"] = 4] = "LENGTH";
})(AjfAggregationType || (AjfAggregationType = {}));

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
// tslint:disable-next-line:prefer-const-enum
var AjfWidgetType;
(function (AjfWidgetType) {
    AjfWidgetType[AjfWidgetType["Layout"] = 0] = "Layout";
    AjfWidgetType[AjfWidgetType["PageBreak"] = 1] = "PageBreak";
    AjfWidgetType[AjfWidgetType["Image"] = 2] = "Image";
    AjfWidgetType[AjfWidgetType["Text"] = 3] = "Text";
    AjfWidgetType[AjfWidgetType["Chart"] = 4] = "Chart";
    AjfWidgetType[AjfWidgetType["Table"] = 5] = "Table";
    AjfWidgetType[AjfWidgetType["Map"] = 6] = "Map";
    AjfWidgetType[AjfWidgetType["Column"] = 7] = "Column";
    AjfWidgetType[AjfWidgetType["Formula"] = 8] = "Formula";
    AjfWidgetType[AjfWidgetType["ImageContainer"] = 9] = "ImageContainer";
    AjfWidgetType[AjfWidgetType["DynamicTable"] = 10] = "DynamicTable";
    AjfWidgetType[AjfWidgetType["Graph"] = 11] = "Graph";
    AjfWidgetType[AjfWidgetType["PaginatedList"] = 12] = "PaginatedList";
    AjfWidgetType[AjfWidgetType["Dialog"] = 13] = "Dialog";
    AjfWidgetType[AjfWidgetType["HeatMap"] = 14] = "HeatMap";
    AjfWidgetType[AjfWidgetType["PaginatedTable"] = 15] = "PaginatedTable";
    AjfWidgetType[AjfWidgetType["LENGTH"] = 16] = "LENGTH";
})(AjfWidgetType || (AjfWidgetType = {}));

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
class AjfReportRenderer {
    get instance() {
        return this._instance;
    }
    set instance(instance) {
        this._instance = instance;
        this._report = instance != null ? instance.report : null;
        this._cdr.markForCheck();
    }
    get report() {
        return this._report;
    }
    get enableExport() {
        return this._enableExport;
    }
    constructor(_cdr) {
        this._cdr = _cdr;
        this.enableExportAll = false;
        this._report = null;
        this._enableExport = true;
    }
    ngAfterViewInit() {
        this._enableExport =
            this.enableExportAll &&
                this._instance != null &&
                this._instance.content &&
                this._instance.content.content
                ? true
                : false;
        this._cdr.markForCheck();
    }
    static { this.ɵfac = function AjfReportRenderer_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfReportRenderer)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: AjfReportRenderer, inputs: { instance: "instance", enableExportAll: "enableExportAll" } }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfReportRenderer, [{
        type: Directive
    }], () => [{ type: i0.ChangeDetectorRef }], { instance: [{
            type: Input
        }], enableExportAll: [{
            type: Input
        }] }); })();

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const buildReportStringIdentifier = (report, context, opts) => {
    if (report == null) {
        return '';
    }
    const stringIdentifier = report.stringIdentifier || [];
    if (stringIdentifier.length === 0) {
        return '';
    }
    return buildStringIdentifier(stringIdentifier, context, opts);
};

class AjfReportStringIdentifierPipe {
    transform(report, context, opts) {
        return buildReportStringIdentifier(report, context, opts);
    }
    static { this.ɵfac = function AjfReportStringIdentifierPipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfReportStringIdentifierPipe)(); }; }
    static { this.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ajfReportStringIdentifier", type: AjfReportStringIdentifierPipe, pure: true }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfReportStringIdentifierPipe, [{
        type: Pipe,
        args: [{ name: 'ajfReportStringIdentifier' }]
    }], null, null); })();

const _c0 = ["*"];
function AjfWidgetExport_ng_container_2_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 4)(1, "button", 5);
    i0.ɵɵlistener("click", function AjfWidgetExport_ng_container_2_div_1_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.exportAll()); });
    i0.ɵɵtext(2, "EXPORT XLSX");
    i0.ɵɵelementEnd()();
} }
function AjfWidgetExport_ng_container_2_ng_template_2_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7)(1, "button", 5);
    i0.ɵɵlistener("click", function AjfWidgetExport_ng_container_2_ng_template_2_div_0_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.export("csv")); });
    i0.ɵɵtext(2, "CSV");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 5);
    i0.ɵɵlistener("click", function AjfWidgetExport_ng_container_2_ng_template_2_div_0_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.export("xlsx")); });
    i0.ɵɵtext(4, "XLSX");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("ajf-export-menu-overlay", ctx_r1.overlay);
} }
function AjfWidgetExport_ng_container_2_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfWidgetExport_ng_container_2_ng_template_2_div_0_Template, 5, 2, "div", 6);
} if (rf & 2) {
    i0.ɵɵnextContext();
    const single_r4 = i0.ɵɵreference(3);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngIf", !ctx_r1.widgets)("ngIfElse", single_r4);
} }
function AjfWidgetExport_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfWidgetExport_ng_container_2_div_1_Template, 3, 0, "div", 3)(2, AjfWidgetExport_ng_container_2_ng_template_2_Template, 1, 2, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const single_r4 = i0.ɵɵreference(3);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.widgets)("ngIfElse", single_r4);
} }
/**
 * Export all widgets data in Xlsx format, one per sheet
 * @param report the ajf report instance
 * @param iconsMap
 */
function exportReportXlsx(report, iconsMap) {
    iconsMap = iconsMap ? iconsMap : {};
    const widgetInstances = report && report.content ? report.content.content : undefined;
    return exportAllWidgets(widgetInstances, iconsMap);
}
/**
 * Checks if p is a {x, y, r?} point and eventually formats it as string.
 */
function formatPointData(p) {
    if (typeof p === 'object' && p !== null && p.x !== undefined && p.y !== undefined) {
        if (p.r === undefined) {
            return `(${p.x}, ${p.y})`;
        }
        return `(${p.x}, ${p.y}, ${p.r})`;
    }
    return p;
}
/**
 * Build xlsx data for export
 * @param widgetType
 * @param data
 * @param iconsMap
 */
function buildXlsxData(widgetType, data, iconsMap) {
    let xlsxData = [];
    let labels = [];
    switch (widgetType) {
        default:
        case AjfWidgetType.Chart:
            data = data;
            const datasets = data.datasets || [];
            labels = ['name'].concat(data.labels);
            xlsxData.push(labels);
            for (let i = 0; i < datasets.length; i++) {
                const row = [];
                const data = datasets[i].data || [];
                row.push(datasets[i].label);
                for (let j = 0; j < data.length; j++) {
                    row.push(formatPointData(data[j]));
                }
                xlsxData.push(row);
            }
            break;
        case AjfWidgetType.DynamicTable:
        case AjfWidgetType.Table:
        case AjfWidgetType.PaginatedTable:
            const tableData = data;
            if (tableData.length > 1) {
                xlsxData = [];
                const nextRows = [];
                let nextRow = [];
                let totRowSpan = 0;
                let nextRowspanNum = 0;
                for (let i = 0; i < tableData.length; i++) {
                    let isNewRowAfterRowspan = false;
                    let res = [];
                    nextRow = [];
                    if (totRowSpan > 0) {
                        res = [...nextRows[nextRowspanNum - 1]];
                        isNewRowAfterRowspan = true;
                    }
                    tableData[i].forEach((elem, idxElem) => {
                        let val = elem.value?.changingThisBreaksApplicationSecurity;
                        if (val === undefined) {
                            if (Array.isArray(elem.value)) {
                                val = String(elem.value);
                            }
                            else {
                                val = elem.value;
                            }
                        }
                        if (val != null && iconsMap[val]) {
                            val = iconsMap[val];
                        }
                        res.push(val);
                        if (elem.colspan && elem.colspan > 1) {
                            for (let j = 1; j < elem.colspan; j++) {
                                res.push(' ');
                            }
                        }
                        if (isNewRowAfterRowspan) {
                            if (elem.rowspan && elem.rowspan > 1) {
                                for (let idx = 1; idx < elem.rowspan; idx++) {
                                    nextRow.push(' ');
                                    nextRows[nextRowspanNum] = nextRows[nextRowspanNum].concat(nextRow);
                                }
                            }
                            if (idxElem === tableData[i].length - 1 && nextRowspanNum > 0) {
                                nextRowspanNum++;
                                if (nextRowspanNum === totRowSpan) {
                                    totRowSpan = 0;
                                    nextRowspanNum = 0;
                                }
                            }
                        }
                        else {
                            if (elem.rowspan && elem.rowspan > 1) {
                                totRowSpan = elem.rowspan;
                                nextRowspanNum = 1;
                                for (let idx = 1; idx < elem.rowspan; idx++) {
                                    nextRow.push(' ');
                                    nextRows[idx - 1] = nextRow;
                                }
                            }
                        }
                    });
                    xlsxData.push(res);
                }
            }
            break;
    }
    return xlsxData;
}
function addExportableWidgetsToSheets(widget, iconsMap, sheets) {
    const idx = Object.keys(sheets).length;
    const sheetName = `${idx}_${AjfWidgetType[widget.widgetType]}`;
    switch (widget.widget.widgetType) {
        case AjfWidgetType.Layout:
            const lw = widget;
            lw.content.map(w => addExportableWidgetsToSheets(w, iconsMap, sheets));
            break;
        case AjfWidgetType.Column:
            const cw = widget;
            cw.content.map(w => addExportableWidgetsToSheets(w, iconsMap, sheets));
            break;
        case AjfWidgetType.Chart:
            const chartInstance = widget;
            sheets[sheetName] = utils.aoa_to_sheet(buildXlsxData(chartInstance.widgetType, chartInstance.data, iconsMap));
            break;
        case AjfWidgetType.Text:
            const tw = widget;
            sheets[sheetName] = utils.aoa_to_sheet([[tw.htmlText]]);
            break;
        case AjfWidgetType.Table:
        case AjfWidgetType.DynamicTable:
        case AjfWidgetType.PaginatedTable:
            const tableInstance = widget;
            sheets[sheetName] = utils.aoa_to_sheet(buildXlsxData(tableInstance.widgetType, tableInstance.data, iconsMap));
            break;
    }
}
/**
 * Export all exportable widgets in Xlsx format, one per sheet
 */
function exportAllWidgets(widgets, iconsMap) {
    const bookType = 'xlsx';
    const sheets = {};
    let fileName = `AllWidgets_${format(new Date(), `yyyy-MM-dd`)}`;
    if (widgets && widgets.length) {
        widgets.forEach(instance => {
            addExportableWidgetsToSheets(instance, iconsMap, sheets);
        });
    }
    if (Object.keys(sheets).length) {
        const workBook = { Sheets: sheets, SheetNames: Object.keys(sheets) };
        writeFile(workBook, `${fileName}.${bookType}`, {
            bookType,
            type: 'array',
        });
        return true;
    }
    return false;
}
class AjfWidgetExport {
    static { this._iconsMap = {}; }
    /**
     * Allows rendering html icons as text.
     */
    static addIcons(icons) {
        AjfWidgetExport._iconsMap = { ...AjfWidgetExport._iconsMap, ...icons };
    }
    constructor() {
        this.overlay = true;
        this.enable = false;
        this.showOverlay = false;
    }
    /**
     * Export widget data in CSV format
     * @deprecated Use `AjfWidgetExport.export` with 'csv' parameter.
     * @breaking-change 13.0.0
     */
    exportCsv() {
        this.export('csv');
    }
    /**
     * Export widget data in Xlsx format
     * @deprecated Use `AjfWidgetExport.export` with 'xlsx' parameter.
     * @breaking-change 13.0.0
     */
    exportXlsx() {
        this.export('xlsx');
    }
    /**
     * Export all widgets data in Xlsx format, one per sheet
     */
    exportAll() {
        exportAllWidgets(this.widgets, AjfWidgetExport._iconsMap);
    }
    /**
     * Export widget data in CSV or Xlsx format
     */
    export(bookType) {
        if (this.widgetType == null) {
            return;
        }
        const sheetName = this._buildTitle(this.widgetType);
        const sheets = {};
        sheets[sheetName] = utils.aoa_to_sheet(buildXlsxData(this.widgetType, this.data, AjfWidgetExport._iconsMap));
        const workBook = { Sheets: sheets, SheetNames: [sheetName] };
        writeFile(workBook, `${sheetName}.${bookType}`, {
            bookType,
            type: 'array',
        });
    }
    _buildTitle(widgetType) {
        return `${AjfWidgetType[widgetType]} ${format(new Date(), `yyyy-MM-dd`)}`;
    }
    static { this.ɵfac = function AjfWidgetExport_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfWidgetExport)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfWidgetExport, selectors: [["ajf-widget-export"]], inputs: { widgetType: "widgetType", data: "data", widgets: "widgets", overlay: "overlay", enable: "enable" }, ngContentSelectors: _c0, decls: 3, vars: 3, consts: [["single", ""], [1, "ajf-widget-wrapper", 3, "mouseenter", "mouseleave"], [4, "ngIf"], ["class", "ajf-export-all", 4, "ngIf", "ngIfElse"], [1, "ajf-export-all"], [3, "click"], ["class", "ajf-export-menu", 3, "ajf-export-menu-overlay", 4, "ngIf", "ngIfElse"], [1, "ajf-export-menu"]], template: function AjfWidgetExport_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef();
            i0.ɵɵelementStart(0, "div", 1);
            i0.ɵɵlistener("mouseenter", function AjfWidgetExport_Template_div_mouseenter_0_listener() { return ctx.showOverlay = true; })("mouseleave", function AjfWidgetExport_Template_div_mouseleave_0_listener() { return ctx.showOverlay = false; });
            i0.ɵɵprojection(1);
            i0.ɵɵtemplate(2, AjfWidgetExport_ng_container_2_Template, 4, 2, "ng-container", 2);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵclassProp("ajf-show-overlay", ctx.showOverlay);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.enable);
        } }, dependencies: [i1.NgIf], styles: ["ajf-widget-export{width:100%;height:inherit}ajf-widget-export .ajf-widget-wrapper{position:relative;height:inherit}ajf-widget-export .ajf-export-all{position:absolute;right:0}ajf-widget-export .ajf-export-all button{margin:.5em;border:none;color:#fff;background-color:#4a403f;padding:7.5px 16px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;cursor:pointer}ajf-widget-export .ajf-export-menu{position:absolute;right:0;top:20px}ajf-widget-export .ajf-export-menu.ajf-export-menu-overlay{display:none}ajf-widget-export .ajf-export-menu button{margin:.5em;border:none;color:#fff;background-color:#4a403f;padding:7.5px 16px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;cursor:pointer}ajf-widget-export .ajf-widget-wrapper.ajf-show-overlay .ajf-export-menu-overlay{display:block}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfWidgetExport, [{
        type: Component,
        args: [{ selector: 'ajf-widget-export', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ajf-widget-wrapper\" (mouseenter)=\"showOverlay = true\" (mouseleave)=\"showOverlay = false\"\n  [class.ajf-show-overlay]=\"showOverlay\">\n  <ng-content></ng-content>\n  <ng-container *ngIf=\"enable\">\n    <div *ngIf=\"widgets; else single\" class=\"ajf-export-all\">\n      <button (click)=\"exportAll()\">EXPORT XLSX</button>\n    </div>\n    <ng-template #single>\n      <div *ngIf=\"!widgets; else single\" class=\"ajf-export-menu\"\n        [class.ajf-export-menu-overlay]=\"overlay\">\n        <button (click)=\"export('csv')\">CSV</button>\n        <button (click)=\"export('xlsx')\">XLSX</button>\n      </div>\n    </ng-template>\n  </ng-container>\n</div>", styles: ["ajf-widget-export{width:100%;height:inherit}ajf-widget-export .ajf-widget-wrapper{position:relative;height:inherit}ajf-widget-export .ajf-export-all{position:absolute;right:0}ajf-widget-export .ajf-export-all button{margin:.5em;border:none;color:#fff;background-color:#4a403f;padding:7.5px 16px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;cursor:pointer}ajf-widget-export .ajf-export-menu{position:absolute;right:0;top:20px}ajf-widget-export .ajf-export-menu.ajf-export-menu-overlay{display:none}ajf-widget-export .ajf-export-menu button{margin:.5em;border:none;color:#fff;background-color:#4a403f;padding:7.5px 16px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;cursor:pointer}ajf-widget-export .ajf-widget-wrapper.ajf-show-overlay .ajf-export-menu-overlay{display:block}\n"] }]
    }], () => [], { widgetType: [{
            type: Input
        }], data: [{
            type: Input
        }], widgets: [{
            type: Input
        }], overlay: [{
            type: Input
        }], enable: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfWidgetExport, { className: "AjfWidgetExport", filePath: "widget-export.ts", lineNumber: 238 }); })();

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
// eslint-disable-next-line
class AjfWidgetHost {
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    static { this.ɵfac = function AjfWidgetHost_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfWidgetHost)(i0.ɵɵdirectiveInject(i0.ViewContainerRef)); }; }
    static { this.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: AjfWidgetHost, selectors: [["", "ajf-widget-host", ""]] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfWidgetHost, [{
        type: Directive,
        args: [{ selector: '[ajf-widget-host]' }]
    }], () => [{ type: i0.ViewContainerRef }], null); })();

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
class AjfReportsModule {
    static { this.ɵfac = function AjfReportsModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfReportsModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AjfReportsModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfReportsModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    AjfGetColumnContentPipe,
                    AjfReportStringIdentifierPipe,
                    AjfWidgetHost,
                    AjfWidgetExport,
                ],
                imports: [CommonModule],
                exports: [AjfGetColumnContentPipe, AjfReportStringIdentifierPipe, AjfWidgetHost, AjfWidgetExport],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AjfReportsModule, { declarations: [AjfGetColumnContentPipe,
        AjfReportStringIdentifierPipe,
        AjfWidgetHost,
        AjfWidgetExport], imports: [CommonModule], exports: [AjfGetColumnContentPipe, AjfReportStringIdentifierPipe, AjfWidgetHost, AjfWidgetExport] }); })();

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
function createAggregation(aggregation) {
    return {
        ...aggregation,
        aggregation: aggregation.aggregation || AjfAggregationType.None,
    };
}

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
class AjfAggregationSerializer {
    static fromJson(json) {
        if (json.aggregation == null) {
            throw new Error('Malformed aggregation');
        }
        return createAggregation({ ...json, aggregation: json.aggregation });
    }
}

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
function createDataset(dataset) {
    return {
        ...dataset,
        aggregation: dataset.aggregation || createAggregation({ aggregation: AjfAggregationType.None }),
    };
}

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
class AjfDatasetSerializer {
    static fromJson(json) {
        if (json.formula == null || json.aggregation == null || json.label == null) {
            throw new Error('Malformed dataset');
        }
        json.formula =
            json.formula instanceof Array
                ? (json.formula = json.formula.map(f => AjfFormulaSerializer.fromJson(f)))
                : AjfFormulaSerializer.fromJson(json.formula);
        json.aggregation = AjfAggregationSerializer.fromJson(json.aggregation);
        return createDataset(json);
    }
}

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
function createWidget(widget) {
    return {
        ...widget,
        styles: widget.styles || {},
        visibility: widget.visibility || alwaysCondition(),
    };
}

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
class AjfWidgetSerializer {
    static fromJson(json) {
        if (json.widgetType == null) {
            throw new Error('Malformed widget');
        }
        json.visibility = json.visibility
            ? AjfConditionSerializer.fromJson(json.visibility)
            : alwaysCondition();
        json.styles = json.styles || {};
        const obj = json;
        if (obj.widgetType === AjfWidgetType.Layout || obj.widgetType === AjfWidgetType.Column) {
            return AjfWidgetSerializer._widgetWithContentFromJson(obj);
        }
        if (obj.widgetType === AjfWidgetType.Chart || obj.widgetType === AjfWidgetType.Table) {
            const w = AjfWidgetSerializer._dataWidgetFromJson(obj);
            if (obj.widgetType === AjfWidgetType.Chart) {
                const cw = w;
                if (cw.labels instanceof Array) {
                    cw.labels.map(l => AjfFormulaSerializer.fromJson(l));
                }
                else if (cw.labels != null) {
                    cw.labels = AjfFormulaSerializer.fromJson(cw.labels);
                }
            }
            return w;
        }
        if (obj.widgetType === AjfWidgetType.Map) {
            const mw = obj;
            mw.coordinate = AjfFormulaSerializer.fromJson(mw.coordinate);
        }
        return obj;
    }
    static _dataWidgetFromJson(json) {
        let dataset;
        if (json.dataset == null) {
            dataset = [];
        }
        else {
            if (json.widgetType === AjfWidgetType.Table) {
                dataset = json.dataset.map(row => row.map(cell => AjfDatasetSerializer.fromJson(cell)));
            }
            else {
                dataset = json.dataset.map(d => AjfDatasetSerializer.fromJson(d));
            }
        }
        return { ...createWidget(json), dataset };
    }
    static _widgetWithContentFromJson(json) {
        const content = (json.content || []).map(c => AjfWidgetSerializer.fromJson(c));
        return { ...createWidget(json), content };
    }
}

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
class AjfReportContainerSerializer {
    static fromJson(json) {
        json.content = (json.content || []).map(c => AjfWidgetSerializer.fromJson(c));
        return { ...json, content: json.content, styles: json.styles || {} };
    }
}

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
function createReport(report) {
    return { ...report };
}

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
class AjfReportSerializer {
    static fromJson(json) {
        const containers = ['header', 'footer', 'content'];
        containers.forEach(c => {
            if (json[c]) {
                json[c] = AjfReportContainerSerializer.fromJson(json[c]);
            }
        });
        return createReport(json);
    }
}

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
class AjfReportWidget {
    get instance() {
        return this._instance;
    }
    set instance(instance) {
        if (this._instance !== instance) {
            this._instance = instance;
            if (this._init) {
                this._loadComponent();
            }
        }
    }
    constructor(_renderer) {
        this._renderer = _renderer;
        this._init = false;
    }
    ngOnInit() {
        this._init = true;
        this._loadComponent();
    }
    _loadComponent() {
        if (!this._init ||
            this._instance == null ||
            this.widgetHost == null ||
            !this._instance.visible) {
            return;
        }
        const componentDef = this.widgetsMap[this._instance.widget.widgetType];
        if (componentDef == null) {
            return;
        }
        const component = componentDef.component;
        if (component === this._currentComponentType && this._currentComponentRef != null) {
            this._currentComponentRef.instance.instance = this._instance;
            return;
        }
        const vcr = this.widgetHost.viewContainerRef;
        vcr.clear();
        this._currentComponentType = component;
        try {
            const componentRef = vcr.createComponent(component);
            this._currentComponentRef = componentRef;
            const componentInstance = componentRef.instance;
            Object.keys(this._instance.widget.styles).forEach((style) => {
                try {
                    this._renderer.setStyle(componentInstance.el.nativeElement, style, `${this._instance.widget.styles[style]}`);
                }
                catch (e) {
                    if (isDevMode()) {
                        console.log(e);
                    }
                }
            });
            componentInstance.instance = this._instance;
            if (componentDef.inputs) {
                Object.keys(componentDef.inputs).forEach(key => {
                    if (key in componentInstance) {
                        componentInstance[key] = componentDef.inputs[key];
                    }
                });
            }
        }
        catch (e) {
            if (isDevMode()) {
                console.log(e);
            }
            this._currentComponentRef = undefined;
            this._currentComponentType = undefined;
        }
    }
    static { this.ɵfac = function AjfReportWidget_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfReportWidget)(i0.ɵɵdirectiveInject(i0.Renderer2)); }; }
    static { this.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: AjfReportWidget, viewQuery: function AjfReportWidget_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(AjfWidgetHost, 7);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.widgetHost = _t.first);
        } }, inputs: { instance: "instance" } }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfReportWidget, [{
        type: Directive
    }], () => [{ type: i0.Renderer2 }], { widgetHost: [{
            type: ViewChild,
            args: [AjfWidgetHost, { static: true }]
        }], instance: [{
            type: Input
        }] }); })();

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const componentsMap = {};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
class AjfWidgetService {
    constructor(defaultWidgets) {
        this.componentsMap = componentsMap;
        if (defaultWidgets != null) {
            for (const key in defaultWidgets) {
                const nKey = parseInt(key, 10);
                this.componentsMap[nKey] = defaultWidgets[key];
            }
        }
    }
    registerCustomWidget(widget) {
        const { widgetType, component } = widget;
        if (widgetType < 100) {
            throw new Error('Invalid custom widget type, it must be greater than 100');
        }
        if (component == null) {
            throw new Error('Invalid custom widget component');
        }
        this.componentsMap[widgetType] = widget;
    }
}

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
function evaluateAggregation(aggregation, formulas, context) {
    const data = formulas.map(f => evaluateExpression(f.formula, context));
    switch (aggregation.aggregation) {
        case AjfAggregationType.None:
            if (data.length !== 1) {
                throw new Error('Invalid aggregation');
            }
            return data[0];
        case AjfAggregationType.Sum:
            return data.map((r) => r.reduce((s, d) => s + d, 0));
        case AjfAggregationType.Average:
        case AjfAggregationType.WeightedAverage:
            return data.map((r) => {
                const sum = r.reduce((s, d) => s + d, 0);
                return sum / data.length;
            });
        default:
            return [];
    }
}

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const isChartWidget = (widget) => {
    return widget != null && widget.widgetType === AjfWidgetType.Chart;
};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const isDialogWidget = (widget) => {
    return widget != null && widget.widgetType === AjfWidgetType.Dialog;
};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const isDynamicTableWidget = (widget) => {
    return widget != null && widget.widgetType === AjfWidgetType.DynamicTable;
};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const isFormulaWidget = (widget) => {
    return widget != null && widget.widgetType === AjfWidgetType.Formula;
};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const isGraphWidget = (widget) => {
    return widget != null && widget.widgetType === AjfWidgetType.Graph;
};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const isHeatMapWidget = (widget) => {
    return widget != null && widget.widgetType === AjfWidgetType.HeatMap;
};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const isImageContainerWidget = (widget) => {
    return widget != null && widget.widgetType === AjfWidgetType.ImageContainer;
};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const isImageWidget = (widget) => {
    return widget != null && widget.widgetType === AjfWidgetType.Image;
};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const isMapWidget = (widget) => {
    return widget != null && widget.widgetType === AjfWidgetType.Map;
};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const isPaginatedListWidget = (widget) => {
    return widget != null && widget.widgetType === AjfWidgetType.PaginatedList;
};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const isPaginatedTableWidget = (widget) => {
    return widget != null && widget.widgetType === AjfWidgetType.PaginatedTable;
};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const isWidgetWithContent = (widget) => {
    return (widget != null &&
        (widget.widgetType === AjfWidgetType.Column ||
            widget.widgetType === AjfWidgetType.Layout ||
            widget.widgetType === AjfWidgetType.Dialog));
};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const isTableWidget = (widget) => {
    return widget != null && widget.widgetType === AjfWidgetType.Table;
};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const isTextWidget = (widget) => {
    return widget != null && widget.widgetType === AjfWidgetType.Text;
};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const isChartWidgetInstance = (instance) => {
    return instance != null && isChartWidget(instance.widget);
};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const isDialogWidgetInstance = (instance) => {
    return instance != null && isDialogWidget(instance.widget);
};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const isDynamicTableWidgetInstance = (instance) => {
    return instance != null && isDynamicTableWidget(instance.widget);
};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const isFormulaWidgetInstance = (instance) => {
    return instance != null && isFormulaWidget(instance.widget);
};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const isGraphWidgetInstance = (instance) => {
    return instance != null && isGraphWidget(instance.widget);
};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const isHeatMapWidgetInstance = (instance) => {
    return instance != null && isHeatMapWidget(instance.widget);
};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const isImageContainerWidgetInstance = (instance) => {
    return instance != null && isImageContainerWidget(instance.widget);
};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const isImageWidgetInstance = (instance) => {
    return instance != null && isImageWidget(instance.widget);
};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const isMapWidgetInstance = (instance) => {
    return instance != null && isMapWidget(instance.widget);
};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const isPaginatedListWidgetInstance = (instance) => {
    return instance != null && isPaginatedListWidget(instance.widget);
};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const isPaginatedTableWidgetInstance = (instance) => {
    return instance != null && isPaginatedTableWidget(instance.widget);
};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const isTableWidgetInstance = (instance) => {
    return instance != null && isTableWidget(instance.widget);
};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const isTextWidgetInstance = (instance) => {
    return instance != null && isTextWidget(instance.widget);
};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const isWidgetWithContentInstance = (instance) => {
    return instance != null && isWidgetWithContent(instance.widget);
};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
function createWidgetInstance(widget, context, _ts, variables = []) {
    let filter = undefined;
    if (widget.filter != null && widget.filter.schema != null) {
        filter = {
            form: AjfFormSerializer.fromJson(widget.filter.schema, context),
            context,
            variables,
        };
    }
    return {
        widget,
        widgetType: widget.widgetType,
        visible: evaluateExpression(widget.visibility.condition, context),
        styles: widget.styles || {},
        filter,
    };
}

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
function evalAndTranslate(f, context, ts) {
    const val = evaluateExpression(f.formula, context);
    if (typeof val === 'string') {
        return ts.translate(val);
    }
    return val;
}
/**
 * Evaluate a string with expressions inside, delimited by double square brackets.
 * Example: "Number of positive identified: [[n_positive_campaign]]"
 */
function evaluateHtmlText(text, context) {
    if (!text.includes('[[')) {
        return text;
    }
    if (text.includes('`')) {
        return "Error: htmlText can't contain backticks `";
    }
    text = text.replaceAll('[[', '${');
    text = text.replaceAll(']]', '}');
    text = '`' + text + '`';
    return evaluateExpression(text, context);
}

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
function widgetToWidgetInstance(widget, context, ts, variables = []) {
    const wi = createWidgetInstance(widget, context, ts, variables);
    if (isWidgetWithContent(widget) && isWidgetWithContentInstance(wi)) {
        let content = [];
        widget.content.forEach(c => {
            if (widget.repetitions != null) {
                wi.repetitions = evaluateExpression(widget.repetitions.formula, context);
                if (typeof wi.repetitions === 'number' && wi.repetitions > 0) {
                    for (let i = 0; i < wi.repetitions; i++) {
                        content.push(widgetToWidgetInstance(c, { ...context, '$repetition': i }, ts, variables));
                    }
                }
            }
            else {
                content.push(widgetToWidgetInstance(c, context, ts, variables));
            }
            wi.content = content;
        });
        if (isDialogWidget(widget) && isDialogWidgetInstance(wi)) {
            wi.toggle = widgetToWidgetInstance(widget.toggle, context, ts, variables);
        }
    }
    else if (isChartWidget(widget) && isChartWidgetInstance(wi)) {
        if (widget.options == null) {
            widget.options = {};
        }
        const labels = widget.labels instanceof Array ? widget.labels : [widget.labels];
        const evLabels = labels.map(l => {
            let evf = evaluateExpression(l.formula, context);
            try {
                if (evf instanceof Array) {
                    evf = evf.map(v => v != null && typeof v === 'string' && v.trim().length > 0 ? ts.translate(v) : v);
                }
                else {
                    evf =
                        evf != null && typeof evf === 'string' && evf.trim().length > 0
                            ? ts.translate(evf)
                            : evf;
                }
            }
            catch (e) {
                if (isDevMode()) {
                    console.log(e);
                }
            }
            return evf;
        });
        wi.labels = widget.labels instanceof Array ? evLabels : evLabels[0];
        wi.datasets = widget.dataset.map(d => {
            let ds = {
                ...(d.options || {}),
                data: evaluateAggregation(d.aggregation, d.formula, context),
            };
            if (d.chartType != null) {
                const ct = chartToChartJsType(d.chartType);
                ds = { ...ds, chartType: ct, type: ct };
            }
            if (d.options != null) {
                ds = { ...ds, options: d.options };
            }
            if (d.label != null) {
                ds = { ...ds, label: d.label.trim().length > 0 ? ts.translate(d.label) : d.label };
            }
            if (d.datalabels != null) {
                ds.datalabels = deepCopy(d.datalabels);
            }
            return ds;
        });
        wi.data = { labels: wi.labels, datasets: wi.datasets };
        wi.chartType = chartToChartJsType(widget.type || widget.chartType);
        wi.exportable =
            widget.exportable && (widget.exportable === true || widget.exportable === 'true')
                ? true
                : false;
        wi.mainDataNumberThreshold = widget.mainDataNumberThreshold;
        wi.removeZeroValues = widget.removeZeroValues;
        if (widget.options != null && widget.options.plugins != null) {
            const plugins = widget.options.plugins;
            const pluginNames = Object.keys(plugins);
            pluginNames.forEach(pluginName => {
                const plugin = plugins[pluginName];
                const pluginOptions = Object.keys(plugin);
                pluginOptions.forEach((pluginOptionName) => {
                    const pluginOption = plugin[pluginOptionName];
                    if (typeof pluginOption !== 'string' &&
                        pluginOption != null &&
                        pluginOption.formula != null) {
                        plugin[pluginOptionName] = evaluateExpression(pluginOption.formula, context);
                    }
                });
            });
        }
    }
    else if (isTableWidget(widget) && isTableWidgetInstance(wi)) {
        wi.dataset = widget.dataset.map(row => row.map(cell => {
            return cell.formula instanceof Array
                ? cell.formula.map(f => evalAndTranslate(f, context, ts))
                : evalAndTranslate(cell.formula, context, ts);
        }));
        wi.exportable =
            widget.exportable && (widget.exportable === true || widget.exportable === 'true')
                ? true
                : false;
        wi.data = (widget.dataset || []).map(row => row.map(cell => {
            const val = cell.formula instanceof Array
                ? cell.formula.map(f => evalAndTranslate(f, context, ts))
                : evalAndTranslate(cell.formula, context, ts);
            return {
                value: val,
                style: { ...widget.cellStyles, ...cell.style },
                rowspan: cell.rowspan,
                colspan: cell.colspan,
                sorted: cell.sorted ?? false,
            };
        }));
    }
    else if ((isDynamicTableWidget(widget) && isDynamicTableWidgetInstance(wi)) ||
        (isPaginatedTableWidget(widget) && isPaginatedTableWidgetInstance(wi))) {
        wi.dataset = widget.dataset.map((cell) => {
            return cell.formula instanceof Array
                ? cell.formula.map(f => evalAndTranslate(f, context, ts))
                : evalAndTranslate(cell.formula, context, ts);
        });
        wi.exportable =
            widget.exportable && (widget.exportable === true || widget.exportable === 'true')
                ? true
                : false;
        let dataset = evaluateExpression(widget.rowDefinition.formula, context) || [];
        dataset = (dataset || []).map((row) => row.map(cell => {
            let trf = cell.value;
            try {
                if (trf instanceof Array) {
                    trf = trf.map(v => v != null && typeof v === 'string' && v.trim().length > 0 ? ts.translate(v) : v);
                }
                else {
                    trf =
                        trf != null && typeof trf === 'string' && trf.trim().length > 0
                            ? ts.translate(trf)
                            : trf;
                }
            }
            catch (e) {
                if (isDevMode()) {
                    console.log(e);
                }
            }
            return { ...cell, value: trf };
        }));
        const header = (widget.dataset || []).map(cell => {
            const val = cell.formula instanceof Array
                ? cell.formula.map(f => evalAndTranslate(f, context, ts))
                : evalAndTranslate(cell.formula, context, ts);
            return {
                value: val,
                style: { ...widget.cellStyles, ...cell.style },
                rowspan: cell.rowspan,
                colspan: cell.colspan,
                sorted: cell.sorted ?? false,
            };
        });
        wi.data = header.length === 0 ? [...dataset] : [[...header], ...dataset];
        wi.styles = { ...wi.styles, alignItems: 'flex-start' };
    }
    else if (isPaginatedListWidget(widget) && isPaginatedListWidgetInstance(wi)) {
        let content = [];
        if (widget.contentDefinition) {
            let contentDefinition = evaluateExpression(widget.contentDefinition.formula, context) || [];
            contentDefinition.forEach(c => {
                content.push(widgetToWidgetInstance(c, context, ts, variables));
            });
        }
        else if (widget.content) {
            widget.content.forEach(c => {
                content.push(widgetToWidgetInstance(c, context, ts, variables));
            });
        }
        wi.content = content;
    }
    else if (isImageWidget(widget) && isImageWidgetInstance(wi)) {
        if (widget.flag) {
            wi.flag = evaluateExpression(widget.flag.formula, context);
        }
        if (widget.icon) {
            wi.icon = evaluateExpression(widget.icon.formula, context);
        }
        if (widget.url) {
            wi.url = evaluateExpression(widget.url.formula, context);
        }
    }
    else if (isImageContainerWidget(widget) && isImageContainerWidgetInstance(wi)) {
        if (widget.flags) {
            wi.flags =
                widget.flags instanceof Array
                    ? widget.flags.map(f => evaluateExpression(f.formula, context))
                    : evaluateExpression(widget.flags.formula, context);
        }
        if (widget.icons) {
            wi.icons =
                widget.icons instanceof Array
                    ? widget.icons.map(f => evaluateExpression(f.formula, context))
                    : evaluateExpression(widget.icons.formula, context);
        }
        if (widget.urls) {
            wi.urls =
                widget.urls instanceof Array
                    ? widget.urls.map(f => evaluateExpression(f.formula, context))
                    : evaluateExpression(widget.urls.formula, context);
        }
    }
    else if (isTextWidget(widget) && isTextWidgetInstance(wi)) {
        wi.htmlText = ts.translate(evaluateHtmlText(widget.htmlText, context));
    }
    else if (isFormulaWidget(widget) && isFormulaWidgetInstance(wi)) {
        wi.formula = evaluateExpression(widget.formula.formula, context);
    }
    else if (isMapWidget(widget) && isMapWidgetInstance(wi)) {
        wi.coordinate = evaluateExpression(widget.coordinate.formula, context);
    }
    else if (isGraphWidget(widget) && isGraphWidgetInstance(wi)) {
        if (widget.nodes != null) {
            wi.nodes = widget.nodes.map(ds => ({
                id: ds.id,
                label: ds.label,
                parentId: ds.parentId,
                green: ds.green === 'true',
                red: ds.red === 'true',
                yellow: ds.yellow === 'true',
                color: ds.color,
            }));
        }
    }
    else if (isHeatMapWidget(widget) && isHeatMapWidgetInstance(wi)) {
        wi.idProp = widget.idProp || 'id';
        wi.features = (typeof widget.features === 'string'
            ? JSON.parse(widget.features)
            : widget.features) || { type: 'FeatureCollection', features: [] };
        wi.values = evaluateExpression(widget.values.formula, context);
        wi.startColor = widget.startColor || '#ffeb3b';
        wi.endColor = widget.endColor || '#f44336';
        wi.highlightColor = widget.highlightColor || '#009688';
        wi.showVisualMap = widget.showVisualMap === true;
        if (widget.action) {
            wi.action = widget.action;
        }
    }
    else if (widget.widgetType > 100) {
        const iiFn = componentsMap[widget.widgetType] != null
            ? componentsMap[widget.widgetType].initInstance
            : null;
        if (iiFn != null) {
            return iiFn(wi, context, ts);
        }
    }
    return wi;
}

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
function createReportContainerInstance(container, context, ts, variables = []) {
    const content = container.content.map(c => {
        return widgetToWidgetInstance(c, context, ts, variables);
    });
    return {
        container,
        content,
        styles: container.styles,
    };
}

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
function createReportInstance(report, context, ts) {
    (report.variables || []).forEach(variable => {
        context[variable.name] = evaluateExpression(variable.formula.formula, context);
    });
    return {
        report,
        header: report.header
            ? createReportContainerInstance(report.header, context, ts, report.variables)
            : undefined,
        content: report.content
            ? createReportContainerInstance(report.content, context, ts, report.variables)
            : undefined,
        footer: report.footer
            ? createReportContainerInstance(report.footer, context, ts, report.variables)
            : undefined,
        styles: report.styles || {},
    };
}
function evaluateReportVariables(report, context) {
    (report.variables || []).forEach(variable => {
        context[variable.name] = evaluateExpression(variable.formula.formula, context);
    });
    return context;
}

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
function createReportContainer(container) {
    return { ...container };
}

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const slideTitleStyle$1 = {
    width: '100%',
    dislay: 'block',
    marginTop: '30px',
};
const widgetTitleStyle$1 = {
    width: '100%',
    dislay: 'block',
    borderTop: '1px dashed gray',
    marginTop: '15px',
    padding: '10px',
    paddingTop: '20px',
    maxHeight: '600px',
};
const boxStyle$1 = {
    dislay: 'block',
    padding: '10px',
};
const indicatorStyle = {
    fontSize: '30px',
};
const widgetStyle$1 = {
    border: '1px dotted gray',
    borderRadius: '6px',
    marginBottom: '10px',
};
const chartStyle = {
    ...widgetStyle$1,
    width: '100%',
    maxWidth: '1000px',
    margin: '10px auto',
};
const bgColor$1 = [
    'rgba(54, 162, 235, 0.6)', // blue
    'rgba(255, 99, 132, 0.6)', // red
    'rgba(255, 159, 64, 0.6)', // orange
    'rgba(255, 205, 86, 0.6)', // yellow
    'rgba(75, 192, 192, 0.6)', // green
    'rgba(153, 102, 255, 0.6)', // purple
    'rgba(201, 203, 207, 0.6)' // grey
];
const backgroundColor$1 = [];
for (let i = 0; i < 10; i++) {
    backgroundColor$1.push(...bgColor$1);
}

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
function createBooleanWidget(field, countFunc) {
    return createWidget({
        widgetType: AjfWidgetType.Chart,
        type: AjfChartType.Pie,
        labels: { formula: "['True', 'False']" },
        dataset: [
            createDataset({
                label: 'true',
                formula: [
                    createFormula({
                        formula: `[${countFunc}(dataset, f => f.${field.name} === true), ${countFunc}(dataset, f => f.${field.name} === false)]`,
                    }),
                ],
                options: { backgroundColor: [backgroundColor$1[4], backgroundColor$1[1]] }, // green, red
            }),
        ],
        options: {
            responsive: true,
            maintainAspectRatio: true,
            legend: { display: true, position: 'bottom' },
        },
        styles: chartStyle,
        exportable: true,
    });
}
function createMultipleChoiceWidget(field, countFunc) {
    const choices = field.choicesOrigin.choices;
    let dataset = choices.map((c, index) => createDataset({
        label: `${c.label}`,
        formula: [
            createFormula({
                formula: `[${countFunc}(dataset, f => (f.${field.name} || []).indexOf("${c.value}") > -1)]`,
            }),
        ],
        options: {
            backgroundColor: backgroundColor$1[index],
            stack: `Stack ${index}`,
        },
    }));
    let chartType = AjfChartType.Bar;
    let labels = { formula: `[]` };
    return createWidget({
        widgetType: AjfWidgetType.Chart,
        type: chartType,
        labels,
        dataset,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            legend: { display: true, position: 'bottom' },
        },
        styles: chartStyle,
        exportable: true,
    });
}
function createIndicator(name, value) {
    return createWidget({
        widgetType: AjfWidgetType.Column,
        styles: boxStyle$1,
        content: [
            createWidget({
                widgetType: AjfWidgetType.Text,
                htmlText: name,
            }),
            createWidget({
                widgetType: AjfWidgetType.Text,
                htmlText: value,
                styles: indicatorStyle,
            }),
        ],
    });
}
function createNumberWidget(field) {
    return createWidget({
        widgetType: AjfWidgetType.Layout,
        columns: Array(5).fill(1 / 5),
        content: [
            createIndicator('Mean', `[[ROUND(MEAN(dataset, "${field.name}"), 2)]]`),
            createIndicator('Median', `[[ROUND(MEDIAN(dataset, "${field.name}"), 2)]]`),
            createIndicator('Mode', `[[ROUND(MODE(dataset, "${field.name}"), 2)]]`),
            createIndicator('Standard Deviation', `[[ROUND(STD(dataset, "${field.name}"), 2)]]`),
            createIndicator('Sum', `[[ROUND(SUM(dataset, "${field.name}"), 2)]]`),
        ],
    });
}
function createSingleChoiceWidget(field, countFunc) {
    const choices = field.choicesOrigin.choices;
    let dataset = [];
    let chartType = AjfChartType.Bar;
    let labels = { formula: `[]` };
    if (choices.length > 5) {
        labels = { formula: `[${choices.map(c => `${JSON.stringify(c.label)}`)}]` };
        chartType = AjfChartType.Pie;
        dataset = [
            createDataset({
                label: field.label,
                formula: [
                    createFormula({
                        formula: `[${choices
                            .map(choice => `${countFunc}(dataset, f => f.${field.name} === '${choice.value}')`)
                            .toString()}]`,
                    }),
                ],
                options: { backgroundColor: backgroundColor$1 },
            }),
        ];
    }
    else {
        dataset = choices.map((c, index) => createDataset({
            label: `${c.label}`,
            formula: [
                createFormula({
                    formula: `[${countFunc}(dataset, f => f.${field.name} === '${c.value}')]`,
                }),
            ],
            options: {
                backgroundColor: backgroundColor$1[index],
                stack: `Stack ${index}`,
            },
        }));
    }
    return createWidget({
        widgetType: AjfWidgetType.Chart,
        type: chartType,
        labels,
        dataset,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            legend: { display: true, position: 'bottom' },
        },
        styles: chartStyle,
        exportable: true,
    });
}
function createRangeWidget(field, countFunc) {
    const end = field.end ?? 11;
    const start = field.start ?? 1;
    let choices = [];
    for (let i = start; i <= end; i++) {
        choices.push(i);
    }
    let labels = { formula: `[${JSON.stringify(field.label)}]` };
    let dataset = choices.map((_, index) => createDataset({
        label: `${index + start}`,
        formula: [
            createFormula({
                formula: `[${countFunc}(dataset, f => f.${field.name} === ${index + start})]`,
            }),
        ],
        options: {
            backgroundColor: backgroundColor$1[index],
            stack: `Stack ${index}`,
        },
    }));
    return createWidget({
        widgetType: AjfWidgetType.Column,
        content: [
            createWidget({
                widgetType: AjfWidgetType.Layout,
                columns: Array(5).fill(1 / 5),
                content: [
                    createIndicator('Mean', `[[ROUND(MEAN(dataset, "${field.name}"), 2)]]`),
                    createIndicator('Median', `[[ROUND(MEDIAN(dataset, "${field.name}"), 2)]]`),
                    createIndicator('Mode', `[[ROUND(MODE(dataset, "${field.name}"), 2)]]`),
                    createIndicator('Standard Deviation', `[[ROUND(STD(dataset, "${field.name}"), 2)]]`),
                    createIndicator('Sum', `[[ROUND(SUM(dataset, "${field.name}"), 2)]]`),
                ],
            }),
            createWidget({
                widgetType: AjfWidgetType.Chart,
                type: AjfChartType.Bar,
                labels,
                dataset,
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    legend: { display: true, position: 'bottom' },
                },
                styles: chartStyle,
                exportable: true,
            }),
        ],
    });
}
/**
 * This function returns a basic report for any form passed in input.
 *
 * @param form the form schema
 * @param id? the id of the form inside the platform.
 */
function automaticReport(formSchema) {
    const form = AjfFormSerializer.fromJson(formSchema.schema);
    const report = {};
    const reportWidgets = [];
    report.variables = [];
    // we assume that the array of forms passed to the report is called 'forms'.
    if (formSchema.id != null) {
        report.variables = [{ name: 'forms', formula: { formula: `forms['${formSchema.id}']` } }];
    }
    report.variables.push({ name: 'dataset', formula: { formula: 'BUILD_DATASET(forms)' } });
    for (const slide of form.nodes) {
        const countFunc = slide.nodeType === AjfNodeType.AjfRepeatingSlide ? 'COUNT_REPS' : 'COUNT_FORMS';
        const slideWidgets = [];
        for (const field of slide.nodes) {
            const fieldTitleWidget = createWidget({
                widgetType: AjfWidgetType.Text,
                htmlText: `<h4>${field.label} - [[${countFunc}(dataset, f => f.${field.name} != null)]] answers</h4>`,
                styles: widgetTitleStyle$1,
            });
            slideWidgets.push(fieldTitleWidget);
            switch (field.fieldType) {
                case AjfFieldType.Number:
                case AjfFieldType.Formula:
                    slideWidgets.push(createNumberWidget(field));
                    break;
                case AjfFieldType.Boolean:
                    slideWidgets.push(createBooleanWidget(field, countFunc));
                    break;
                case AjfFieldType.SingleChoice:
                    slideWidgets.push(createSingleChoiceWidget(field, countFunc));
                    break;
                case AjfFieldType.MultipleChoice:
                    slideWidgets.push(createMultipleChoiceWidget(field, countFunc));
                    break;
                case AjfFieldType.Range:
                    slideWidgets.push(createRangeWidget(field, countFunc));
                    break;
                default:
                    slideWidgets.pop(); // remove the title of empty widget
            }
        }
        if (slideWidgets.length > 0) {
            const slideTitleWidget = createWidget({
                widgetType: AjfWidgetType.Text,
                htmlText: `<h1>${slide.label}</h1>`,
                styles: slideTitleStyle$1,
            });
            reportWidgets.push(slideTitleWidget, ...slideWidgets);
        }
    }
    report.content = createReportContainer({ content: [...reportWidgets], styles: {} });
    return report;
}

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
// firstToken returns the first token in s.
// s must not begin with whitespace characters.
function firstToken(s) {
    if (s.length === 0) {
        return { type: 0 /* TokenType.END */, text: '' };
    }
    let m;
    const c = s.charAt(0);
    switch (c) {
        case '(':
            return { type: 1 /* TokenType.LParen */, text: '(' };
        case ')':
            return { type: 2 /* TokenType.RParen */, text: ')' };
        case '[':
            return { type: 3 /* TokenType.LBracket */, text: '[' };
        case ']':
            return { type: 4 /* TokenType.RBracket */, text: ']' };
        case ',':
            return { type: 5 /* TokenType.Comma */, text: ',' };
        case '+':
            return { type: 6 /* TokenType.Plus */, text: '+' };
        case '-':
            return { type: 7 /* TokenType.Minus */, text: '-' };
        case '*':
            return { type: 8 /* TokenType.Mul */, text: '*' };
        case '/':
            return { type: 9 /* TokenType.Div */, text: '/' };
        case '<':
            if (s.length > 1 && s.charAt(1) === '=') {
                return { type: 11 /* TokenType.LessOrEq */, text: '<=' };
            }
            return { type: 10 /* TokenType.Less */, text: '<' };
        case '>':
            if (s.length > 1 && s.charAt(1) === '=') {
                return { type: 13 /* TokenType.GreaterOrEq */, text: '>=' };
            }
            return { type: 12 /* TokenType.Greater */, text: '>' };
        case '=':
            return { type: 14 /* TokenType.Equal */, text: '=' };
        case '!':
            if (s.length > 1 && s.charAt(1) === '=') {
                return { type: 15 /* TokenType.NotEqual */, text: '!=' };
            }
            return { type: 16 /* TokenType.Not */, text: '!' };
        case '$':
            m = s.match(/^\$[a-zA-Z_]\w*/);
            if (m === null) {
                throw new Error('invalid field name in: ' + s);
            }
            return { type: 20 /* TokenType.Field */, text: m[0] };
        case '"':
            m = s.match(/^"(\\\\|\\"|[^"])*"/);
            if (m === null) {
                throw new Error('unterminated string literal in: ' + s);
            }
            return { type: 17 /* TokenType.String */, text: m[0] };
        case "'":
            m = s.match(/^'(\\\\|\\'|[^'])*'/);
            if (m === null) {
                throw new Error('unterminated string literal in: ' + s);
            }
            return { type: 17 /* TokenType.String */, text: m[0] };
    }
    if (c >= '0' && c <= '9') {
        m = s.match(/^\d+(\.\d+)?([eE][\+\-]?\d+)?/);
        if (m === null) {
            throw new Error('impossible');
        }
        return { type: 18 /* TokenType.Number */, text: m[0] };
    }
    m = s.match(/^[a-zA-Z_]\w*/);
    if (m !== null) {
        return { type: 19 /* TokenType.Ident */, text: m[0] };
    }
    if (s.match(/^\s/) !== null) {
        throw new Error('string s has a leading whitespace');
    }
    throw new Error('unrecognized token in: ' + s);
}
function tokenize(s) {
    const toks = [];
    while (true) {
        s = s.trim();
        const t = firstToken(s);
        toks.push(t);
        if (t.type === 0 /* TokenType.END */) {
            return toks;
        }
        s = s.slice(t.text.length);
    }
}
function indicatorToJs(formula) {
    switch (typeof formula) {
        case 'string':
            if (formula.startsWith('js:')) {
                return formula.slice(3).trim();
            }
            break;
        case 'number':
        case 'boolean':
            formula = String(formula);
            break;
        default:
            throw new Error('formula is not a string');
    }
    return parseExpression(tokenize(formula).reverse(), 0 /* TokenType.END */);
}
function unexpectedTokenError(tok, rest) {
    if (tok.type === 0 /* TokenType.END */) {
        return new Error('unexpected end of token stream');
    }
    rest.push(tok);
    return new Error('unexpected token at the start of: ' + printTokens(rest));
}
function printTokens(revToks) {
    let s = '';
    while (revToks.length > 0) {
        const tok = revToks.pop();
        if (tok.type >= 6 /* TokenType.Plus */ && tok.type <= 15 /* TokenType.NotEqual */) {
            // binary operators
            s += ' ' + tok.text + ' ';
        }
        else if (tok.type === 5 /* TokenType.Comma */) {
            s += ', ';
        }
        else {
            s += tok.text;
        }
    }
    return s;
}
function consume(revToks, expectedType) {
    const tok = revToks.pop();
    if (tok.type !== expectedType) {
        throw unexpectedTokenError(tok, revToks);
    }
    return tok;
}
// parseExpression parses the first expression in revToks
// and returns its JavaScript/ajf translation.
// revToks is reversed, the first token of the expression being at index length-1;
// this way, tokens can be consumed efficiently with revToks.pop().
// After the expression, the function expects to find the token expectedEnd.
function parseExpression(revToks, expectedEnd) {
    if (expectedEnd !== 0 /* TokenType.END */ &&
        expectedEnd !== 2 /* TokenType.RParen */ &&
        expectedEnd !== 5 /* TokenType.Comma */ &&
        expectedEnd !== 4 /* TokenType.RBracket */) {
        throw new Error('invalid expectedEnd');
    }
    let js = '';
    while (true) {
        // Expression.
        let tok = revToks.pop();
        let next;
        switch (tok.type) {
            case 19 /* TokenType.Ident */:
                next = revToks[revToks.length - 1];
                if (next.type === 1 /* TokenType.LParen */) {
                    js += parseFunctionCall(tok.text, revToks);
                }
                else if (next.type === 3 /* TokenType.LBracket */) {
                    consume(revToks, 3 /* TokenType.LBracket */);
                    const index = parseExpression(revToks, 4 /* TokenType.RBracket */);
                    consume(revToks, 4 /* TokenType.RBracket */);
                    js += `${tok.text}[${index}]`;
                }
                else {
                    js += tok.text;
                }
                break;
            case 20 /* TokenType.Field */:
                js += 'form.' + tok.text.slice('$'.length);
                break;
            case 17 /* TokenType.String */:
            case 18 /* TokenType.Number */:
                js += tok.text;
                break;
            case 6 /* TokenType.Plus */:
            case 7 /* TokenType.Minus */:
                next = revToks[revToks.length - 1];
                if (next.type === 6 /* TokenType.Plus */ || next.type === 7 /* TokenType.Minus */) {
                    throw unexpectedTokenError(revToks.pop(), revToks);
                }
                js += tok.text;
                continue;
            case 16 /* TokenType.Not */:
                js += '!';
                continue;
            case 1 /* TokenType.LParen */:
                js += '(' + parseExpression(revToks, 2 /* TokenType.RParen */) + ')';
                consume(revToks, 2 /* TokenType.RParen */);
                break;
            case 3 /* TokenType.LBracket */:
                js += '[' + parseList(revToks, 4 /* TokenType.RBracket */) + ']';
                consume(revToks, 4 /* TokenType.RBracket */);
                break;
            default:
                throw unexpectedTokenError(tok, revToks);
        }
        // Possible end of expression. expectedEnd can be:
        // END,
        // RParen for expressions between parentheses,
        // Comma for function arguments, in which case we also accept RParen,
        // RBracket for array elements,  in which case we also accept Comma.
        // Note that we don't consume the end token.
        const type = revToks[revToks.length - 1].type;
        if (type === expectedEnd ||
            (expectedEnd === 5 /* TokenType.Comma */ && type === 2 /* TokenType.RParen */) ||
            (expectedEnd === 4 /* TokenType.RBracket */ && type === 5 /* TokenType.Comma */)) {
            return js;
        }
        // Operator.
        tok = revToks.pop();
        if (tok.type >= 6 /* TokenType.Plus */ && tok.type <= 13 /* TokenType.GreaterOrEq */) {
            js += ' ' + tok.text + ' ';
            continue;
        }
        switch (tok.type) {
            case 19 /* TokenType.Ident */:
                if (tok.text === 'AND') {
                    js += ' && ';
                    break;
                }
                if (tok.text === 'OR') {
                    js += ' || ';
                    break;
                }
                throw unexpectedTokenError(tok, revToks);
            case 14 /* TokenType.Equal */:
                js += ' == ';
                break;
            case 15 /* TokenType.NotEqual */:
                js += ' != ';
                break;
            default:
                throw unexpectedTokenError(tok, revToks);
        }
    }
}
// parseList parses a comma-separated list of expressions.
// expectedEnd is Comma for function arguments and RBracket for arrays,
// according to the behavior of parseExpression.
function parseList(revToks, expectedEnd) {
    if (expectedEnd !== 5 /* TokenType.Comma */ && expectedEnd !== 4 /* TokenType.RBracket */) {
        throw new Error('invalid expectedEnd');
    }
    let next = revToks[revToks.length - 1];
    if (next.type === 2 /* TokenType.RParen */ || next.type === 4 /* TokenType.RBracket */) {
        // empty list
        return '';
    }
    let js = '';
    while (true) {
        js += parseExpression(revToks, expectedEnd);
        next = revToks[revToks.length - 1];
        if (next.type === 2 /* TokenType.RParen */ || next.type === 4 /* TokenType.RBracket */) {
            return js;
        }
        consume(revToks, 5 /* TokenType.Comma */);
        js += ', ';
    }
}
// parseFunctionCall parses a function call expression.
// The list of supported functions is in
//   projects/core/models/utils/expression-utils.ts
// The function name has already been scanned.
function parseFunctionCall(name, revToks) {
    const args = functionArgs[name];
    if (args) {
        return parseFunctionWithArgs(name, revToks, args);
    }
    if (name === 'IF') {
        consume(revToks, 1 /* TokenType.LParen */);
        let js = '(' + parseExpression(revToks, 5 /* TokenType.Comma */) + ' ? ';
        consume(revToks, 5 /* TokenType.Comma */);
        js += parseExpression(revToks, 5 /* TokenType.Comma */) + ' : ';
        consume(revToks, 5 /* TokenType.Comma */);
        js += parseExpression(revToks, 5 /* TokenType.Comma */) + ')';
        consume(revToks, 2 /* TokenType.RParen */);
        return js;
    }
    throw new Error('unsupported function: ' + name);
}
/*
  Parses a function call expression.
  args tells how many arguments the function takes and their type.
  For example, the indicator function
    SUM(forms[0], $age, $gender = "male")
  can be parsed with
    parseFunctionWithArgs('SUM', revToks, ['arg', 'field', 'func(form)?'])
  resulting in the following JavaScript:
    SUM(forms[0], 'age', (form) => form.gender === "male")
*/
function parseFunctionWithArgs(name, revToks, args) {
    consume(revToks, 1 /* TokenType.LParen */);
    let argsJs = '';
    for (let i = 0; i < args.length; i++) {
        let argType = args[i];
        if (argType.endsWith('?') && revToks[revToks.length - 1].type === 2 /* TokenType.RParen */) {
            break;
        }
        if (argType.endsWith('?')) {
            argType = argType.slice(0, -1);
        }
        if (i !== 0) {
            consume(revToks, 5 /* TokenType.Comma */);
            argsJs += ', ';
        }
        let argJs = parseExpression(revToks, 5 /* TokenType.Comma */);
        if (argType === 'field' && isField(argJs)) {
            argJs = "'" + argJs.slice('form.'.length) + "'";
        }
        else if (argType.startsWith('func')) {
            argJs = argType.slice('func'.length) + ' => ' + argJs;
        }
        argsJs += argJs;
    }
    consume(revToks, 2 /* TokenType.RParen */);
    return `${name}(${argsJs})`;
}
function isField(js) {
    return /^form\.[a-zA-Z_]\w*$/.test(js);
}
const functionArgs = {
    ADD_DAYS: ["arg", "arg"],
    ALL_VALUES_OF: ["arg", "field", "func(form)?"],
    APPLY_LABELS: ["arg", "arg", "arg"],
    APPLY: ["arg", "field", "func(form)"],
    BUILD_DATASET: ["arg", "arg?"],
    CHART_TO_DATA: ["arg", "arg"],
    COMPARE_DATE: ["arg", "arg", "arg", "arg?"],
    CONCAT: ["arg", "arg"],
    CONSOLE_LOG: ["arg"],
    COUNT_FORMS: ["arg", "func(form)?"],
    COUNT_REPS: ["arg", "func(form)?"],
    DAYS_DIFF: ["arg", "arg"],
    FILTER_BY: ["arg", "func(form)"],
    FIRST: ["arg", "func(form)", "field?"],
    FLATTEN_REPS: ["arg", "arg"],
    FORMAT_TABLE_ROWS: ["arg"],
    FORMAT_TABLE_COLS: ["arg"],
    FORMAT_TABLE_FIELDS: ["arg", "arg"],
    FROM_REPS: ["arg", "func(form)"],
    GET_AGE: ["arg", "arg?"],
    GET_LABELS: ["arg", "arg"],
    INCLUDES: ["arg", "arg"],
    IS_AFTER: ["arg", "arg"],
    IS_BEFORE: ["arg", "arg"],
    IS_WITHIN_INTERVAL: ["arg", "arg", "arg"],
    JOIN_FORMS: ["arg", "arg", "field", "field?"],
    JOIN_REPEATING_SLIDES: ["arg", "arg", "field", "field", "field", "field?"],
    LAST: ["arg", "func(form)", "field?"],
    LEN: ["arg"],
    MAP: ["arg", "func(elem)"],
    MIN: ["arg", "field", "func(form)?"],
    MAX: ["arg", "field", "func(form)?"],
    MEAN: ["arg", "field", "func(form)?"],
    MEDIAN: ["arg", "field", "func(form)?"],
    MODE: ["arg", "field", "func(form)?"],
    OP: ["arg", "arg", "func(elemA, elemB)"],
    PERCENT: ["arg", "arg"],
    PERCENTAGE_CHANGE: ["arg", "arg"],
    PROMPT_RESULT: ["arg", "arg"],
    REMOVE_DUPLICATES: ["arg"],
    ROUND: ["arg", "arg?"],
    SUM: ["arg", "field", "func(form)?"],
    TODAY: [],
};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const slideTitleStyle = {
    width: '100%',
    dislay: 'block',
    border: '1px solid gray',
    margin: '10px 10px 0px 10px',
    padding: '10px',
    backgroundColor: 'white',
};
const slideContentStyle = {
    with: '100%',
    dislay: 'block',
    border: '1px solid gray',
    margin: '0px 10px 10px 50px',
    padding: '10px',
    backgroundColor: 'white',
};
const widgetTitleStyle = {
    width: '100%',
    dislay: 'block',
    padding: '10px',
    maxHeight: '600px',
    backgroundColor: 'white',
};
const htmlWidget = {
    width: '100%',
    dislay: 'block',
    padding: '10px',
    backgroundColor: 'white',
    marginBottom: '10px',
};
const boxStyle = {
    dislay: 'block',
    padding: '10px',
    width: '100%',
    height: '100%',
};
const widgetStyle = {
    border: '1px dotted gray',
    borderRadius: '6px',
    marginBottom: '10px',
};
const bgColor = [
    'rgba(54, 162, 235, 0.6)', // blue
    'rgba(255, 99, 132, 0.6)', // red
    'rgba(255, 159, 64, 0.6)', // orange
    'rgba(255, 205, 86, 0.6)', // yellow
    'rgba(75, 192, 192, 0.6)', // green
    'rgba(153, 102, 255, 0.6)', // purple
    'rgba(201, 203, 207, 0.6)' // grey
];
const backgroundColor = [];
for (let i = 0; i < 10; i++) {
    backgroundColor.push(...bgColor);
}

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
/**
 * This function builds a report from an excel file.
 */
function xlsReport(file, http) {
    const workbook = XLSX.read(file, { type: 'binary' });
    const report = {};
    const reportWidgets = [];
    const variables = [];
    const filters = {};
    // create filters
    workbook.SheetNames.forEach((sheetName, index) => {
        const sheet = workbook.Sheets[sheetName];
        if (sheetName.includes('filter') && index + 1 < workbook.SheetNames.length) {
            const nextSheet = sheetName.includes('global')
                ? 'global_filter'
                : workbook.SheetNames[index + 1];
            filters[nextSheet] = _buildFilter(workbook, sheet, http);
        }
    });
    const obsFilterValues = Object.values(filters).length
        ? Object.values(filters)
        : [of({})];
    const filterNames = Object.keys(filters);
    return forkJoin(obsFilterValues).pipe(map(f => {
        workbook.SheetNames.forEach(sheetName => {
            const sheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(sheet);
            if (sheetName === 'variables') {
                const jsonVars = json.map(jsonVar => jsonVar);
                jsonVars
                    .filter(e => e != null && e.name != null && e.name !== '')
                    .forEach(elem => {
                    const r = Number(elem.__rowNum__) + 1;
                    const name = String(elem.name).trim();
                    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) {
                        const msg = `Variable name "${name}" (row ${r}) is not a valid identifier`;
                        window.alert(msg);
                        throw new Error(msg);
                    }
                    let js;
                    try {
                        js = indicatorToJs(elem.value);
                    }
                    catch (err) {
                        err = new Error(`Error in variable "${name}" (row ${r}): ${err.message}`);
                        window.alert(err.message);
                        throw err;
                    }
                    variables.push({
                        name,
                        formula: { formula: js },
                        isAIPrompt: elem.isAIPrompt,
                    });
                });
            }
            else {
                const idx = filterNames.indexOf(sheetName);
                if (sheetName.includes('table')) {
                    const tableWidget = _buildTable(sheetName, json);
                    reportWidgets.push(tableWidget);
                }
                else if (sheetName.includes('chart')) {
                    const chartWidget = _buildChart(sheetName, json);
                    reportWidgets.push(chartWidget);
                }
                else if (sheetName.includes('image')) {
                    const imageWidget = _buildImage(sheetName, json);
                    reportWidgets.push(imageWidget);
                }
                else if (sheetName.includes('html')) {
                    const chartWidget = _buildHtml(json);
                    reportWidgets.push(chartWidget);
                }
                else if (sheetName.includes('graph')) {
                    const graphWidget = _buildGraph(sheetName, json);
                    reportWidgets.push(graphWidget);
                }
                else if (sheetName.includes('heatmap')) {
                    const heatmapWidget = _buildHeatmap(sheetName, json);
                    reportWidgets.push(heatmapWidget);
                }
                else if (sheetName.includes('paginatedlist')) {
                    const pagListWidget = _buildPaginatedListTable(sheetName, json);
                    reportWidgets.push(pagListWidget);
                }
                else if (sheetName.includes('paginatedDialogList')) {
                    const pagListWidget = _buildPaginatedListTableWithDialog(sheetName, json);
                    reportWidgets.push(pagListWidget);
                }
                else if (sheetName.includes('single')) {
                    const singleWidget = _buildSingleIndicator(json);
                    reportWidgets.push(...singleWidget);
                }
                if (idx >= 0) {
                    reportWidgets[reportWidgets.length - 1].filter = {
                        schema: f[idx],
                    };
                }
            }
        });
        const globalFilterIdx = filterNames.indexOf('global_filter');
        const layoutWidget = {
            widgetType: AjfWidgetType.Layout,
            content: [
                createWidget({
                    widgetType: AjfWidgetType.Column,
                    content: [...reportWidgets],
                    filter: globalFilterIdx >= 0 ? { schema: f[globalFilterIdx] } : undefined,
                }),
            ],
            columns: [1],
            visibility: {
                condition: 'true',
            },
            styles: {},
        };
        report.variables = variables;
        report.content = createReportContainer(layoutWidget);
        return report;
    }));
}
function _buildFilter(wbook, sheet, http) {
    const data = new FormData();
    const filterBook = deepCopy(wbook);
    const filterSheet = deepCopy(sheet);
    const choicesSheet = deepCopy(wbook.Sheets['choices']);
    filterBook.SheetNames = ['survey', 'choices'];
    filterBook.Sheets = { survey: filterSheet, choices: choicesSheet };
    const filterXlsx = XLSX.write(filterBook, {
        bookType: 'xlsx',
        type: 'array',
    });
    const file = new File([filterXlsx], 'filter.xlsx');
    data.append('excelFile', file);
    return http.post('https://formconv.herokuapp.com/result.json', data);
}
function alertAndThrow(err) {
    window.alert(err);
    throw new Error(err);
}
function _buildChart(name, sheet) {
    if (sheet == null || sheet.length === 0) {
        alertAndThrow('Empty sheet for chart ' + name);
    }
    const data = sheet[0];
    const optionsNames = [
        'chartType',
        'title',
        'stacked',
        'beginAtZeroX',
        'beginAtZeroY',
        'axisLabelX',
        'axisLabelY',
        'axisMinX',
        'axisMinY',
        'axisMaxX',
        'axisMaxY',
        'removeZeroValues',
        'mainDataNumberThreshold',
    ];
    const options = {};
    for (const name of optionsNames) {
        if (data[name] != null) {
            options[name] = data[name];
            delete data[name];
        }
    }
    const type = AjfChartType[options['chartType']];
    if (type == null) {
        alertAndThrow('Invalid chart type for chart ' + name);
    }
    if (type !== AjfChartType.Scatter && type !== AjfChartType.Bubble && sheet.length !== 1) {
        alertAndThrow(`Chart "${name}" must have 1 row of data`);
    }
    if (type === AjfChartType.Scatter && sheet.length !== 2) {
        alertAndThrow(`Scatter chart "${name}" must have 2 rows of data`);
    }
    if (type === AjfChartType.Bubble && sheet.length !== 3) {
        alertAndThrow(`Bubble chart "${name}" must have 3 rows of data`);
    }
    const labels = data['labels'];
    let labelsFormula = { formula: '[]' };
    if (labels != null) {
        delete data['labels'];
        let labelsJs = '';
        try {
            labelsJs = indicatorToJs(labels);
        }
        catch (err) {
            alertAndThrow(`Error in labels of chart ${name}: ${err.message}`);
        }
        labelsFormula = { formula: labelsJs };
    }
    const stacked = Boolean(options['stacked']);
    const beginAtZeroX = Boolean(options['beginAtZeroX']);
    const beginAtZeroY = Boolean(options['beginAtZeroY']);
    const axisLabelX = options['axisLabelX'];
    const axisLabelY = options['axisLabelY'];
    const axisMinX = options['axisMinX'];
    const axisMinY = options['axisMinY'];
    const axisMaxX = options['axisMaxX'];
    const axisMaxY = options['axisMaxY'];
    const removeZeroValues = Boolean(options['removeZeroValues']);
    const mainDataNumberThreshold = +options['mainDataNumberThreshold'] || +options['mainDataNumberThreshold'] === 0
        ? +options['mainDataNumberThreshold']
        : 10;
    const dataset = [];
    Object.keys(data).forEach((key, index) => {
        let xs = '';
        try {
            xs = indicatorToJs(data[key]);
        }
        catch (err) {
            alertAndThrow(`Error in X data "${key}" of chart "${name}": ${err.message}`);
        }
        let ys = '';
        if (type === AjfChartType.Scatter || type === AjfChartType.Bubble) {
            try {
                ys = indicatorToJs(sheet[1][key]);
            }
            catch (err) {
                alertAndThrow(`Error in Y data "${key}" of chart "${name}": ${err.message}`);
            }
        }
        let rs = 'undefined';
        if (type === AjfChartType.Bubble) {
            try {
                rs = indicatorToJs(sheet[2][key]);
            }
            catch (err) {
                alertAndThrow(`Error in radius data "${key}" of chart "${name}": ${err.message}`);
            }
        }
        let formula;
        if (type === AjfChartType.Scatter || type === AjfChartType.Bubble) {
            formula = [createFormula({ formula: `buildPointData(${xs}, ${ys}, ${rs})` })];
        }
        else {
            formula = [createFormula({ formula: xs })];
        }
        const multipleColors = type === AjfChartType.Pie ||
            type === AjfChartType.PolarArea ||
            type === AjfChartType.Doughnut;
        const color = multipleColors ? backgroundColor$1 : backgroundColor$1[index];
        const datasetOptions = { backgroundColor: color, tension: 0 };
        if (type === AjfChartType.Line && !stacked) {
            datasetOptions.backgroundColor = 'transparent';
            datasetOptions.borderColor = color;
            datasetOptions.pointBackgroundColor = color;
        }
        dataset.push({
            ...createDataset({
                aggregation: { aggregation: 0 },
                formula,
                label: key,
            }),
            options: datasetOptions,
        });
    });
    const scales = {};
    if (stacked || beginAtZeroX || axisMinX != null || axisMaxX != null || axisLabelX) {
        const axisX = {
            stacked,
            ticks: { beginAtZero: beginAtZeroX },
        };
        if (axisMinX != null) {
            axisX.ticks.suggestedMin = Number(axisMinX);
        }
        if (axisMaxX != null) {
            axisX.ticks.suggestedMax = Number(axisMaxX);
        }
        if (axisLabelX) {
            axisX.scaleLabel = { display: true, labelString: axisLabelX };
        }
        scales.xAxes = [axisX];
    }
    if (stacked || beginAtZeroY || axisMinY != null || axisMaxY != null || axisLabelY) {
        const axisY = {
            stacked,
            ticks: { beginAtZero: stacked || beginAtZeroY },
        };
        if (axisMinY != null) {
            axisY.ticks.suggestedMin = Number(axisMinY);
        }
        if (axisMaxY != null) {
            axisY.ticks.suggestedMax = Number(axisMaxY);
        }
        if (axisLabelY) {
            axisY.scaleLabel = { display: true, labelString: axisLabelY };
        }
        scales.yAxes = [axisY];
    }
    return createWidget({
        name,
        widgetType: AjfWidgetType.Chart,
        type,
        labels: labelsFormula,
        dataset,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            legend: { display: true, position: 'bottom' },
            title: {
                display: true,
                text: options['title'] || '',
            },
            scales,
        },
        styles: {
            ...widgetStyle,
            ...{ width: '100%', maxWidth: '1000px', margin: '10px auto' },
        },
        exportable: true,
        mainDataNumberThreshold: mainDataNumberThreshold,
        removeZeroValues: removeZeroValues,
    });
}
function _buildGraph(name, json) {
    const nodes = [];
    json.forEach(row => {
        const rowKeys = Object.keys(row);
        if (rowKeys.includes('id') && row['id']) {
            const rowId = row['id'].trim().replace(/"/g, '');
            if (rowId && rowId.length) {
                let graphNodeObj = {};
                rowKeys.forEach(rowKey => {
                    let js;
                    try {
                        js = indicatorToJs(row[rowKey]);
                    }
                    catch (err) {
                        const rowNum = Number(row['__rowNum__']) + 1;
                        err = new Error(`Error in "${name}", row ${rowNum}, column "${rowKey}": ${err.message}`);
                        window.alert(err.message);
                        throw err;
                    }
                    graphNodeObj[rowKey] = js;
                });
                graphNodeObj['id'] = rowId;
                nodes.push(graphNodeObj);
            }
        }
    });
    return createWidget({
        widgetType: AjfWidgetType.Graph,
        nodes,
        styles: {},
    });
}
function _buildImage(sheetName, rows) {
    if (rows.length === 0 || !rows[0]['url']) {
        const msg = `Image "${sheetName}" has no url`;
        window.alert(msg);
        throw new Error(msg);
    }
    const row = rows[0];
    let urlFormula = String(row['url']);
    if (urlFormula.startsWith('js:')) {
        urlFormula = urlFormula.slice(3).trim();
    }
    else {
        urlFormula = `"${urlFormula}"`;
    }
    const align = (row['align'] || '').trim().toLowerCase();
    const styles = {};
    if (align === 'left' || align === 'center') {
        styles.marginRight = 'auto';
    }
    if (align === 'right' || align === 'center') {
        styles.marginLeft = 'auto';
    }
    if (row['width']) {
        styles.width = row['width'];
    }
    if (row['height']) {
        styles.height = row['height'];
    }
    return createWidget({
        widgetType: AjfWidgetType.Image,
        imageType: 0,
        url: { formula: urlFormula },
        styles,
    });
}
function _buildHtml(json) {
    const firstRow = json.length > 0 && json[0]['html'] != null ? json[0] : { html: '' };
    return createWidget({
        widgetType: AjfWidgetType.Text,
        htmlText: String(firstRow['html']),
        styles: htmlWidget,
    });
}
function getTrendWidget(value, color, condition, icon) {
    let percValue = `[[${value}]]%`;
    if (!value) {
        percValue = '';
    }
    return createWidget({
        widgetType: AjfWidgetType.Text,
        htmlText: `<i class=\"material-icons\" style=\"vertical-align: bottom; color: ${color}\">${icon}</i><span style=\"color: ${color}\">${percValue}</span>`,
        styles: {
            ...htmlWidget,
            color: color,
            fontSize: '16px',
            justifyContent: 'center',
        },
        visibility: {
            condition: condition,
        },
    });
}
function _buildSingleIndicator(json) {
    const indicatorWidgets = [];
    const firstRow = json.length > 0 && json[0]['html'] != null ? json[0] : { html: '' };
    indicatorWidgets.push(createWidget({
        widgetType: AjfWidgetType.Text,
        htmlText: String(firstRow['html']),
        styles: {
            ...htmlWidget,
            marginBottom: '0',
            justifyContent: 'center',
        },
    }));
    let showTrend = false;
    let marginBottom = '10px';
    if (firstRow['percentage_change']) {
        showTrend = true;
        marginBottom = '0';
    }
    indicatorWidgets.push(createWidget({
        widgetType: AjfWidgetType.Text,
        htmlText: '[[' + String(firstRow['current_value']) + ']]',
        styles: {
            ...htmlWidget,
            marginBottom,
            fontSize: '90px',
            fontWeight: 'bold',
            lineHeight: '1',
            justifyContent: 'center',
        },
    }));
    if (showTrend) {
        indicatorWidgets.push(getTrendWidget(String(firstRow['percentage_change']), 'red', `${String(firstRow['percentage_change'])} < 0`, 'trending_down'));
        indicatorWidgets.push(getTrendWidget(String(firstRow['percentage_change']), 'green', `${String(firstRow['percentage_change'])} > 0`, 'trending_up'));
        indicatorWidgets.push(getTrendWidget(String(firstRow['percentage_change']), 'orange', `${String(firstRow['percentage_change'])} == 0`, 'trending_flat'));
        indicatorWidgets.push(getTrendWidget(null, 'orange', `${String(firstRow['percentage_change'])} === '-'`, 'remove'));
    }
    return indicatorWidgets;
}
function headerFormula(s) {
    s = String(s);
    if (s.startsWith('js:')) {
        return { formula: s.slice(3).trim() };
    }
    // quote s
    return { formula: JSON.stringify(s) };
}
function _buildTable(sheetName, json) {
    let tableHeader = [];
    let dataRows = '[]';
    let formula = '';
    let pageSize = 10;
    let pagination = false;
    if (json.length > 1) {
        const rowspan = 1;
        const titles = Object.keys(json[0]);
        const colspanRowValues = Object.values(json[0]).map(v => (v ? v.toString() : ''));
        const colspans = colspanRowValues.map(r => +r.charAt(0));
        const textAlign = colspanRowValues.map(r => {
            switch (r.charAt(1)) {
                case 'l':
                    return 'left';
                case 'r':
                    return 'right';
                default:
                    return 'center';
            }
        });
        const sortCols = colspanRowValues.map(r => r.charAt(2) && r.charAt(2) === 's' ? true : false);
        tableHeader = titles.map((title, index) => ({
            label: '',
            formula: headerFormula(title),
            aggregation: { aggregation: 0 },
            colspan: colspans[index],
            rowspan,
            sorted: sortCols[index],
            style: {
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'white',
                backgroundColor: '#3f51b5',
                borderBottom: '2px solid #ddd',
            },
        }));
        pagination = json[1]['pagination'] ? json[1]['pagination'] : false;
        if ('dataset' in json[1]) {
            const dialogFields = json[1]['dialog_fields']
                ? json[1]['dialog_fields'].split(',').map(v => v.trim())
                : [];
            const dialogLabelFields = json[1]['dialog_fields_labels']
                ? json[1]['dialog_fields_labels'].split(',').map(v => v.trim())
                : [];
            formula = _buildFormListTable(json, colspans, textAlign, dialogFields, dialogLabelFields);
            if (dialogFields && dialogFields.length) {
                tableHeader.push({
                    label: '',
                    formula: { formula: `" "` },
                    aggregation: { aggregation: 0 },
                    colspan: 1,
                    rowspan,
                    style: {
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: 'white',
                        backgroundColor: '#3f51b5',
                        borderBottom: '2px solid #ddd',
                    },
                });
            }
        }
        else {
            delete json[0];
            dataRows = '[';
            json.forEach(row => {
                let dataRow = '[';
                titles.forEach(title => {
                    let elem = row[title] || `''`;
                    try {
                        elem = indicatorToJs(elem);
                    }
                    catch (err) {
                        const rowNum = Number(row['__rowNum__']) + 1;
                        err = new Error(`Error in "${sheetName}", row ${rowNum}, column "${title}": ${err.message}`);
                        window.alert(err.message);
                        throw err;
                    }
                    dataRow += elem + ',';
                });
                dataRow += ']';
                dataRows += dataRow + ',';
            });
            dataRows += ']';
            formula = `buildAlignedDataset(plainArray(${dataRows}),${JSON.stringify(colspans)},${JSON.stringify(textAlign)})`;
        }
    }
    if (pagination) {
        return createWidget({
            widgetType: AjfWidgetType.PaginatedTable,
            pageSize: pageSize,
            rowDefinition: {
                formula: formula,
            },
            dataset: tableHeader,
            exportable: true,
            cellStyles: {
                textAlign: 'center',
                color: 'black',
                backgroundColor: 'white',
            },
            styles: {
                borderCollapse: 'collapse',
            },
        });
    }
    else {
        return createWidget({
            widgetType: AjfWidgetType.DynamicTable,
            rowDefinition: {
                formula: formula,
            },
            dataset: tableHeader,
            exportable: true,
            cellStyles: {
                textAlign: 'center',
                color: 'black',
                backgroundColor: 'white',
            },
            styles: {
                borderCollapse: 'collapse',
            },
        });
    }
}
/**
 * Create a formula for a dynamic table widget, based on a list of Forms
 * @param json
 * @returns the formula for the DynamicTable AjfWidget, like this:
 * buildFormDataset(projectsDataset, ['id_p','donors','budget','dino_area_name','calc_progress',])"
 */
function _buildFormListTable(json, colspans, textAlign, dialogFields, dialogLabelFields) {
    let formula = '';
    if (json.length > 1) {
        let fields = '[';
        Object.keys(json[0]).forEach(fieldColName => {
            let elem = json[1][fieldColName] ? `'${json[1][fieldColName]}'` : `''`;
            fields += elem + ',';
        });
        fields += ']';
        const dataset = json[1]['dataset'];
        const linkField = json[1]['link_field'];
        const linkPos = json[1]['link_position'] ? +json[1]['link_position'] : 0;
        const rowLink = linkField && linkField.length ? `{'link': '${linkField}', 'position': ${linkPos}}` : null;
        formula = `buildAlignedFormDataset(${dataset}, ${fields}, ${JSON.stringify(colspans)}, ${JSON.stringify(textAlign)}, ${rowLink}, ${JSON.stringify(dialogFields)}, ${JSON.stringify(dialogLabelFields)})`;
    }
    return formula;
}
/**
 * Create a widget with a dynamic paginated table based on a list of Forms. Each row is an AjfTable.
 * @param sheetName
 * @param json
 * @returns a Paginated AjfWidget with a formula like this:
 * buildWidgetDataset(projectsDataset, ['id_p','donors','budget','dino_area_name','calc_progress','home_link_text',],
 *   {'link': 'home_link', 'position': 5}, {'border': 'none'},{'width': '900px'}, ['10%','30%','10%','25%','15%','10%'], \"#f0f0f0\", \"white\")"
 */
function _buildPaginatedListTable(_, json) {
    let formula = '';
    let pageSize = 10;
    let dataset = '';
    let title = '';
    if (json.length > 1) {
        const colsPercentage = Object.values(json[0])
            .map(r => `'${r}%'`)
            .join(',');
        const colsPercentageArray = `[${colsPercentage}]`;
        let fields = '[';
        Object.keys(json[0]).forEach(fieldColName => {
            let elem = json[1][fieldColName] ? `'${json[1][fieldColName]}'` : `''`;
            fields += elem + ',';
        });
        fields += ']';
        dataset = json[1]['dataset'];
        title = json[1]['title'];
        pageSize = json[1]['pageSize'] ? +json[1]['pageSize'] : 10;
        const linkField = json[1]['link_field'];
        const linkPos = json[1]['link_position'] ? +json[1]['link_position'] : 0;
        const rowLink = linkField && linkField.length ? `{'link': '${linkField}', 'position': ${linkPos}}` : null;
        const cellStyles = json[1]['cellStyles'];
        const rowStyle = json[1]['rowStyle'];
        const backgroundColorA = json[1]['backgroundColorA'];
        const backgroundColorB = json[1]['backgroundColorB'];
        formula =
            `buildWidgetDataset(${dataset}, ${fields}, ${rowLink}, ${cellStyles},` +
                `${rowStyle}, ${colsPercentageArray}, ${JSON.stringify(backgroundColorA)}, ${JSON.stringify(backgroundColorB)})`;
    }
    return createWidget({
        widgetType: AjfWidgetType.PaginatedList,
        pageSize: pageSize,
        title: title,
        contentDefinition: {
            formula: formula,
        },
        exportable: true,
        styles: {
            height: '500px',
        },
    });
}
/**
 * Create a widget with a dynamic paginated table based on a list of Forms. Each row is an AjfDialogWidget with an AjfTable
 * that open, on click, a dialog.
 * @param sheetName
 * @param json
 * @returns a Paginated AjfWidget with a formula like this:
 * buildWidgetDatasetWithDialog(projectsDataset, ['id_p','donors','province_choicesLabel','dino_area_name','calc_progress','home_link_text',],
 *  ['id_p','donors','province_choicesLabel','dino_area_name'], ['Codice progetto','Donors','Provinces','Settore di attivita'],
 *  {'border': 'none'},{'width': '900px'}, ['10%','30%','10%','25%','15%','10%'], \"#f0f0f0\", \"white\")
 */
function _buildPaginatedListTableWithDialog(_, json) {
    let formula = '';
    let pageSize = 10;
    let dataset = '';
    let title = '';
    if (json.length > 1) {
        const colsPercentage = Object.values(json[0])
            .map(r => `'${r}%'`)
            .join(',');
        const colsPercentageArray = `[${colsPercentage}]`;
        let fields = '[';
        Object.keys(json[0]).forEach(fieldColName => {
            let elem = json[1][fieldColName] ? `'${json[1][fieldColName]}'` : `''`;
            fields += elem + ',';
        });
        fields += ']';
        let dialogFields = '[';
        let dialogLabelFields = '[';
        if (json.length > 3) {
            dialogLabelFields += Object.values(json[2]).map(v => `'${v}'`).join(',');
            dialogFields += Object.values(json[3]).map(v => `'${v}'`).join(',');
        }
        dialogFields += ']';
        dialogLabelFields += ']';
        dataset = json[1]['dataset'];
        title = json[1]['title'];
        pageSize = json[1]['pageSize'] ? +json[1]['pageSize'] : 10;
        const cellStyles = json[1]['cellStyles'];
        const rowStyle = json[1]['rowStyle'];
        const backgroundColorA = json[1]['backgroundColorA'];
        const backgroundColorB = json[1]['backgroundColorB'];
        formula =
            `buildWidgetDatasetWithDialog(${dataset}, ${fields}, ${dialogFields}, ${dialogLabelFields}, ${cellStyles},` +
                `${rowStyle}, ${colsPercentageArray}, ${JSON.stringify(backgroundColorA)}, ${JSON.stringify(backgroundColorB)})`;
    }
    return createWidget({
        widgetType: AjfWidgetType.PaginatedList,
        pageSize: pageSize,
        title: title,
        contentDefinition: {
            formula: formula,
        },
        exportable: true,
        styles: {
            height: '500px',
        },
    });
}
const _buildHeatmap = (_, json) => {
    const defaultFeatures = {
        type: 'FeatureCollection',
        features: [],
    };
    const options = {
        values: '[]',
        idProp: 'id',
        features: JSON.stringify(defaultFeatures),
        startColor: '#ffeb3b',
        endColor: '#f44336',
        highlightColor: '#009688',
        showVisualMap: false,
        ...(json.length > 0 ? json[0] : {}),
    };
    return createWidget({
        widgetType: AjfWidgetType.HeatMap,
        ...options,
        values: { formula: options.values },
        styles: {
            minHeight: '200px',
        },
    });
};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
function loadReportImages(report) {
    const promises = [];
    if (report.header != null) {
        promises.push(loadContainerImages(report.header));
    }
    if (report.content != null) {
        promises.push(loadContainerImages(report.content));
    }
    if (report.footer != null) {
        promises.push(loadContainerImages(report.footer));
    }
    return new Promise(resolve => {
        Promise.all(promises).then(maps => {
            let map = {};
            for (const m of maps) {
                map = { ...map, ...m };
            }
            resolve(map);
        });
    });
}
function loadContainerImages(container) {
    const promises = [];
    for (let widget of container.content) {
        promises.push(loadWidgetImages(widget));
    }
    return new Promise(resolve => {
        Promise.all(promises).then(maps => {
            let map = {};
            for (const m of maps) {
                map = { ...map, ...m };
            }
            resolve(map);
        });
    });
}
function loadWidgetImages(widget) {
    switch (widget.widgetType) {
        case AjfWidgetType.Layout:
        case AjfWidgetType.Column:
            return loadContainerImages(widget);
        case AjfWidgetType.Image:
            const image = widget;
            if (image.widget.imageType !== AjfImageType.Image) {
                break;
            }
            if (image.url.startsWith('data:image')) {
                return Promise.resolve({ [image.url]: image.url });
            }
            return new Promise(resolve => {
                const req = new XMLHttpRequest();
                req.onerror = () => resolve({}); // ignore 404's
                req.onload = () => {
                    const r = new FileReader();
                    r.onerror = () => resolve({});
                    r.onloadend = () => {
                        const result = r.result;
                        if (result.startsWith('data:image')) {
                            const map = {};
                            map[image.url] = result;
                            resolve(map);
                        }
                        else {
                            resolve({});
                        }
                    };
                    r.readAsDataURL(req.response);
                };
                req.open('GET', image.url);
                req.responseType = 'blob';
                req.send();
            });
    }
    return new Promise(resolve => resolve({}));
}
function tableCellText(cell) {
    switch (typeof cell.value) {
        case 'number':
            return String(cell.value);
        case 'string':
            return cell.value;
        case 'object':
            if (cell.value == null) {
                return '';
            }
            let val = cell.value.changingThisBreaksApplicationSecurity;
            if (val === undefined) {
                val = cell.value.toString();
            }
            if (typeof val === 'number') {
                val = String(val);
            }
            return val || '';
        default:
            if (cell.value == null) {
                return '';
            }
            return String(cell.value);
    }
}
function stripHTML(s) {
    s = s.replace(/<\/?[^>]+(>|$)/g, '');
    if (!s.includes('&')) {
        return s;
    }
    return s.replaceAll('&nbsp;', ' ')
        .replaceAll('&lt;', '<')
        .replaceAll('&gt;', '>')
        .replaceAll('&#61;', '=')
        .replaceAll('&#39;', "'")
        .replaceAll('&quot;', '"')
        .replaceAll('&amp;', '&');
}

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const pageWidth = 800;
const pageHeight = pageWidth * 1.4142; // A4 proportions
const pageMargins = [40, 60];
function openReportPdf(report, orientation = 'portrait', icons = {}, header) {
    createReportPdf(report, orientation, icons, header).then(pdf => {
        pdf.open();
    });
}
function createReportPdf(report, orientation = 'portrait', icons = {}, header) {
    return new Promise(resolve => {
        loadReportImages(report).then(images => {
            let width = pageWidth - pageMargins[0] * 2;
            if (orientation === 'landscape') {
                width = pageHeight - pageMargins[1] * 2;
            }
            const pdfDef = reportToPdf(report, { ...images, ...icons }, width, header);
            pdfDef.pageSize = { width: pageWidth, height: pageHeight };
            pdfDef.pageMargins = pageMargins;
            pdfDef.pageOrientation = orientation;
            resolve(createPdf(pdfDef));
        });
    });
}
function reportToPdf(report, images, width, header) {
    const stack = header ? [...header] : [];
    if (report.header != null) {
        stack.push(containerToPdf(report.header, images, width));
    }
    if (report.content != null) {
        stack.push(containerToPdf(report.content, images, width));
    }
    if (report.footer != null) {
        stack.push(containerToPdf(report.footer, images, width));
    }
    return { content: { stack } };
}
function containerToPdf(container, images, width) {
    return { stack: container.content.map(w => widgetToPdf(w, images, width)) };
}
const marginBetweenWidgets = 10;
function widgetToPdf(widget, images, width) {
    switch (widget.widget.widgetType) {
        case AjfWidgetType.Layout:
            return layoutToPdf(widget, images, width);
        case AjfWidgetType.PageBreak:
            return { text: '', pageBreak: 'after' };
        case AjfWidgetType.Image:
            return imageToPdf(widget, images, width);
        case AjfWidgetType.Text:
            return htmlTextToPdf(widget.htmlText);
        case AjfWidgetType.Chart:
            const chart = widget;
            const dataUrl = chart.canvasDataUrl == null ? '' : chart.canvasDataUrl();
            if (dataUrl === '') {
                return { text: '[chart with no attached canvas]' };
            }
            return { image: dataUrl, width, margin: [0, 0, 0, marginBetweenWidgets] };
        case AjfWidgetType.Table:
        case AjfWidgetType.DynamicTable:
        case AjfWidgetType.PaginatedTable:
            return tableToPdf(widget);
        case AjfWidgetType.Column:
            const cw = widget;
            return { stack: cw.content.map(w => widgetToPdf(w, images, width)) };
        case AjfWidgetType.Formula:
            const fw = widget;
            return { text: fw.formula, margin: [0, 0, 0, marginBetweenWidgets] };
        default:
            return { text: '' };
    }
}
function layoutToPdf(lw, images, width) {
    const columns = [...lw.widget.columns];
    while (columns.length < lw.content.length) {
        columns.push(1);
    }
    const childWidth = width / (columns.length || 1);
    const children = [];
    for (let i = 0; i < lw.content.length; i++) {
        let child = widgetToPdf(lw.content[i], images, childWidth);
        // Children of Layout widgets are supposed to be Columns. If they aren't,
        // we must wrap them to avoid problems like images having an 'auto' width.
        if (child.stack == null) {
            child = { stack: [child] };
        }
        child.width = columns[i] === -1 ? 'auto' : '*';
        children.push(child);
    }
    return { columns: children };
}
function imageToPdf(image, images, width) {
    if (image.widget.imageType !== AjfImageType.Image) {
        // Can't get icons to work, pdfs with multiple fonts don't seem to be working
        return { text: '' };
    }
    const dataUrl = images[image.url];
    if (dataUrl == null) {
        return { text: '' };
    }
    width /= 2;
    const w = image.styles['width'];
    if (typeof w === 'string' && w.endsWith('px')) {
        width = Number(w.slice(0, -2));
    }
    const styles = image.styles;
    let alignment = 'left';
    if (styles.marginLeft === 'auto' && styles.marginRight === 'auto') {
        alignment = 'center';
    }
    else if (styles.marginLeft === 'auto') {
        alignment = 'right';
    }
    return { image: dataUrl, width, alignment, margin: [0, 0, 0, marginBetweenWidgets] };
}
function htmlTextToPdf(htmlText) {
    const paragraphs = htmlText.split(/(?=<p|<h1|<h2|<h3|<li)/);
    return {
        stack: paragraphs.map(paragraphToPdf),
        margin: [0, 0, 0, marginBetweenWidgets],
    };
}
function paragraphToPdf(par) {
    let alignment;
    if (/^<\w\w? align="center"/.test(par)) {
        alignment = "center";
    }
    else if (/^<\w\w? align="right"/.test(par)) {
        alignment = "right";
    }
    else if (/^<\w\w? align="justify"/.test(par)) {
        alignment = "justify";
    }
    let fontSize;
    if (par.startsWith('<h1')) {
        fontSize = 20;
    }
    else if (par.startsWith('<h2')) {
        fontSize = 16;
    }
    else if (par.startsWith('<h3')) {
        fontSize = 14;
    }
    if (fontSize !== undefined) {
        return { text: stripHTML(par).trim(), fontSize, alignment, margin: [0, 5, 0, 0] };
    }
    if (par.startsWith('<li')) {
        return { ul: [{ text: textRuns$1(par), alignment }] };
    }
    return { text: textRuns$1(par), alignment };
}
function textRuns$1(par) {
    const strings = par.split(/(?=<b>|<\/b>|<i>|<\/i>|<u>|<\/u>)/);
    let bold = false;
    let italics = false;
    let decoration;
    const runs = [];
    for (let i = 0; i < strings.length; i++) {
        let s = strings[i];
        if (s.startsWith('<b>')) {
            bold = true;
        }
        else if (s.startsWith('</b>')) {
            bold = false;
        }
        else if (s.startsWith('<i>')) {
            italics = true;
        }
        else if (s.startsWith('</i>')) {
            italics = false;
        }
        else if (s.startsWith('<u>')) {
            decoration = 'underline';
        }
        else if (s.startsWith('</u>')) {
            decoration = undefined;
        }
        s = stripHTML(s);
        if (i === 0) {
            s = s.trimStart();
        }
        if (i === strings.length - 1) {
            s = s.trimEnd();
        }
        runs.push({ text: s, bold, italics, decoration });
    }
    return runs;
}
function tableToPdf(table) {
    if (table.data == null || table.data.length === 0) {
        return { text: '' };
    }
    const body = [];
    for (const dataRow of expandColAndRowSpan(table.data)) {
        const bodyRow = [];
        for (const cell of dataRow) {
            const text = tableCellText(cell);
            const stack = htmlTextToPdf(text);
            bodyRow.push({ ...stack, colSpan: cell.colspan, rowSpan: cell.rowspan });
        }
        body.push(bodyRow);
    }
    return {
        table: { headerRows: 0, body },
        margin: [0, 0, 0, marginBetweenWidgets],
    };
}
// pdfmake wants placeholder cells after cells with col/rowspan > 1
function expandColAndRowSpan(data) {
    data = deepCopy(data);
    // expand colspan:
    for (const row of data) {
        for (let j = 0; j < row.length; j++) {
            const cell = row[j];
            for (let k = 1; k < (cell.colspan || 1); k++) {
                row.splice(j + k, 0, { rowspan: cell.rowspan, value: '', style: {} });
            }
        }
    }
    // expand rowspan:
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        for (let j = 0; j < row.length; j++) {
            const cell = row[j];
            for (let k = 1; k < (cell.rowspan || 1); k++) {
                data[i + k].splice(j, 0, { value: '', style: {} });
            }
        }
    }
    return data;
}

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
function downloadBlob(b) {
    const url = URL.createObjectURL(b);
    const a = document.createElement('a');
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.target = '_blank';
    a.download = 'report.docx';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}
function downloadReportDoc(report, header = [], orient = PageOrientation.PORTRAIT) {
    createReportDoc(report, header, orient).then(blob => {
        downloadBlob(blob);
    });
}
function createReportDoc(report, header = [], orient = PageOrientation.PORTRAIT) {
    return new Promise(resolve => {
        loadReportImages(report).then(images => {
            const doc = reportToDoc(report, images, header, orient);
            Packer.toBlob(doc).then(blob => resolve(blob));
        });
    });
}
function reportToDoc(report, images, header, orientation) {
    const width = orientation === PageOrientation.LANDSCAPE ? 13950 : 9000;
    const children = [...header];
    if (report.header != null) {
        children.push(...containerToDoc(report.header, images, width));
    }
    if (report.content != null) {
        children.push(...containerToDoc(report.content, images, width));
    }
    if (report.footer != null) {
        children.push(...containerToDoc(report.footer, images, width));
    }
    return new Document({ sections: [{
                properties: { page: { size: { orientation } } },
                children
            }] });
}
function containerToDoc(container, images, width) {
    return container.content.map(w => widgetToDoc(w, images, width)).flat();
}
const chartSize = { width: 600, height: 300 };
function imageSize(styles) {
    const size = { width: 300, height: 300 };
    if (typeof styles.width === 'string' && styles.width.endsWith('px')) {
        size.width = Number(styles.width.slice(0, -2));
    }
    if (typeof styles.height === 'string' && styles.height.endsWith('px')) {
        size.height = Number(styles.height.slice(0, -2));
    }
    return size;
}
function widgetToDoc(widget, images, width) {
    const marginBetweenWidgets = new Paragraph('');
    switch (widget.widget.widgetType) {
        case AjfWidgetType.Layout:
        case AjfWidgetType.Column:
            return containerToDoc(widget, images, width);
        case AjfWidgetType.PageBreak:
            return [new Paragraph({ children: [new PageBreak()] })];
        case AjfWidgetType.Image:
            return [imageToDoc(widget, images), marginBetweenWidgets];
        case AjfWidgetType.Text:
            return [...htmlTextToDoc(widget.htmlText), marginBetweenWidgets];
        case AjfWidgetType.Chart:
            const chart = widget;
            const dataUrl = chart.canvasDataUrl == null ? '' : chart.canvasDataUrl();
            if (dataUrl === '') {
                return [new Paragraph('[chart with no attached canvas]'), marginBetweenWidgets];
            }
            return [
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new ImageRun({ data: dataUrl, transformation: chartSize })],
                }),
                marginBetweenWidgets,
            ];
        case AjfWidgetType.Table:
        case AjfWidgetType.DynamicTable:
        case AjfWidgetType.PaginatedTable:
            return [tableToDoc(widget, width), marginBetweenWidgets];
        case AjfWidgetType.Formula:
            return [new Paragraph(widget.formula), marginBetweenWidgets];
        default:
            return [];
    }
}
function imageToDoc(image, images) {
    if (image.widget.imageType !== AjfImageType.Image) {
        return new Paragraph('[unsupported image type]');
    }
    const dataUrl = images[image.url];
    if (dataUrl == null) {
        return new Paragraph("[couldn't load image]");
    }
    const styles = image.styles;
    let alignment = AlignmentType.LEFT;
    if (styles.marginLeft === 'auto' && styles.marginRight === 'auto') {
        alignment = AlignmentType.CENTER;
    }
    else if (styles.marginLeft === 'auto') {
        alignment = AlignmentType.RIGHT;
    }
    const i = dataUrl.indexOf(',');
    const base64 = dataUrl.slice(i + 1);
    return new Paragraph({ alignment, children: [new ImageRun({
                data: Uint8Array.from(atob(base64), c => c.charCodeAt(0)),
                transformation: imageSize(styles),
            })] });
}
function htmlTextToDoc(htmlText) {
    const paragraphs = htmlText.split(/(?=<p|<h1|<h2|<h3|<li)/);
    return paragraphs.map(paragraphToDoc);
}
function paragraphToDoc(par) {
    let alignment = undefined;
    if (/^<\w\w? align="center"/.test(par)) {
        alignment = AlignmentType.CENTER;
    }
    else if (/^<\w\w? align="right"/.test(par)) {
        alignment = AlignmentType.RIGHT;
    }
    else if (/^<\w\w? align="justify"/.test(par)) {
        alignment = AlignmentType.JUSTIFIED;
    }
    let heading = undefined;
    if (par.startsWith('<h1')) {
        heading = HeadingLevel.HEADING_1;
    }
    else if (par.startsWith('<h2')) {
        heading = HeadingLevel.HEADING_2;
    }
    else if (par.startsWith('<h3')) {
        heading = HeadingLevel.HEADING_3;
    }
    if (heading !== undefined) {
        return new Paragraph({ text: stripHTML(par).trim(), heading, alignment });
    }
    let bullet = undefined;
    if (par.startsWith('<li')) {
        bullet = { level: 0 };
    }
    return new Paragraph({ children: textRuns(par), bullet, alignment });
}
function textRuns(par) {
    const strings = par.split(/(?=<b>|<\/b>|<i>|<\/i>|<u>|<\/u>)/);
    let bold = false;
    let italics = false;
    let underline = undefined;
    const runs = [];
    for (let i = 0; i < strings.length; i++) {
        let s = strings[i];
        if (s.startsWith('<b>')) {
            bold = true;
        }
        else if (s.startsWith('</b>')) {
            bold = false;
        }
        else if (s.startsWith('<i>')) {
            italics = true;
        }
        else if (s.startsWith('</i>')) {
            italics = false;
        }
        else if (s.startsWith('<u>')) {
            underline = { type: UnderlineType.SINGLE };
        }
        else if (s.startsWith('</u>')) {
            underline = undefined;
        }
        s = stripHTML(s);
        if (i === 0) {
            s = s.trimStart();
        }
        if (i === strings.length - 1) {
            s = s.trimEnd();
        }
        runs.push(new TextRun({ text: s, bold, italics, underline }));
    }
    return runs;
}
function tableToDoc(table, width) {
    if (table.data == null || table.data.length === 0) {
        return new Paragraph('[empty table]');
    }
    let numCols = 0;
    for (const cell of table.data[0]) {
        numCols += cell.colspan || 1;
    }
    return new Table({
        columnWidths: Array(numCols).fill(width / numCols),
        rows: table.data.map(row => new TableRow({
            children: row.map(cell => {
                const text = tableCellText(cell);
                const paragraphs = htmlTextToDoc(text);
                return new TableCell({
                    children: paragraphs,
                    columnSpan: cell.colspan || undefined,
                    rowSpan: cell.rowspan || undefined,
                });
            }),
        })),
    });
}

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AjfAggregationSerializer, AjfAggregationType, AjfBaseWidgetComponent, AjfChartType, AjfDatasetSerializer, AjfGetColumnContentPipe, AjfReportContainerSerializer, AjfReportRenderer, AjfReportSerializer, AjfReportStringIdentifierPipe, AjfReportWidget, AjfReportsModule, AjfWidgetExport, AjfWidgetHost, AjfWidgetSerializer, AjfWidgetService, AjfWidgetType, automaticReport, chartToChartJsType, createAggregation, createReportDoc, createReportInstance, createReportPdf, createWidget, createWidgetInstance, downloadReportDoc, evaluateReportVariables, exportReportXlsx, openReportPdf, widgetToWidgetInstance, xlsReport };
//# sourceMappingURL=ajf-core-reports.mjs.map
