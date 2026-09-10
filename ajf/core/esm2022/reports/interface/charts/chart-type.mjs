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
export var AjfChartType;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvcmVwb3J0cy9zcmMvaW50ZXJmYWNlL2NoYXJ0cy9jaGFydC10eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILDZDQUE2QztBQUM3QyxNQUFNLENBQU4sSUFBWSxZQVdYO0FBWEQsV0FBWSxZQUFZO0lBQ3RCLCtDQUFJLENBQUE7SUFDSiw2Q0FBRyxDQUFBO0lBQ0gsaUVBQWEsQ0FBQTtJQUNiLGlEQUFLLENBQUE7SUFDTCxxREFBTyxDQUFBO0lBQ1AsdURBQVEsQ0FBQTtJQUNSLDZDQUFHLENBQUE7SUFDSCx5REFBUyxDQUFBO0lBQ1QsbURBQU0sQ0FBQTtJQUNOLG1EQUFNLENBQUE7QUFDUixDQUFDLEVBWFcsWUFBWSxLQUFaLFlBQVksUUFXdkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpwcmVmZXItY29uc3QtZW51bVxuZXhwb3J0IGVudW0gQWpmQ2hhcnRUeXBlIHtcbiAgTGluZSxcbiAgQmFyLFxuICBIb3Jpem9udGFsQmFyLFxuICBSYWRhcixcbiAgU2NhdHRlcixcbiAgRG91Z2hudXQsXG4gIFBpZSxcbiAgUG9sYXJBcmVhLFxuICBCdWJibGUsXG4gIExFTkdUSCxcbn1cbiJdfQ==