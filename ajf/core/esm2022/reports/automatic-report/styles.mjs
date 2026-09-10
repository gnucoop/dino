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
export const slideTitleStyle = {
    width: '100%',
    dislay: 'block',
    marginTop: '30px',
};
export const widgetTitleStyle = {
    width: '100%',
    dislay: 'block',
    borderTop: '1px dashed gray',
    marginTop: '15px',
    padding: '10px',
    paddingTop: '20px',
    maxHeight: '600px',
};
export const boxStyle = {
    dislay: 'block',
    padding: '10px',
};
export const indicatorStyle = {
    fontSize: '30px',
};
export const widgetStyle = {
    border: '1px dotted gray',
    borderRadius: '6px',
    marginBottom: '10px',
};
export const chartStyle = {
    ...widgetStyle,
    width: '100%',
    maxWidth: '1000px',
    margin: '10px auto',
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
export const backgroundColor = [];
for (let i = 0; i < 10; i++) {
    backgroundColor.push(...bgColor);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9yZXBvcnRzL3NyYy9hdXRvbWF0aWMtcmVwb3J0L3N0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFJSCxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQWM7SUFDeEMsS0FBSyxFQUFFLE1BQU07SUFDYixNQUFNLEVBQUUsT0FBTztJQUNmLFNBQVMsRUFBRSxNQUFNO0NBQ2xCLENBQUM7QUFDRixNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBYztJQUN6QyxLQUFLLEVBQUUsTUFBTTtJQUNiLE1BQU0sRUFBRSxPQUFPO0lBQ2YsU0FBUyxFQUFFLGlCQUFpQjtJQUM1QixTQUFTLEVBQUUsTUFBTTtJQUNqQixPQUFPLEVBQUUsTUFBTTtJQUNmLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLFNBQVMsRUFBRSxPQUFPO0NBQ25CLENBQUM7QUFDRixNQUFNLENBQUMsTUFBTSxRQUFRLEdBQWM7SUFDakMsTUFBTSxFQUFFLE9BQU87SUFDZixPQUFPLEVBQUUsTUFBTTtDQUNoQixDQUFDO0FBQ0YsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFjO0lBQ3ZDLFFBQVEsRUFBRSxNQUFNO0NBQ2pCLENBQUM7QUFDRixNQUFNLENBQUMsTUFBTSxXQUFXLEdBQWM7SUFDcEMsTUFBTSxFQUFFLGlCQUFpQjtJQUN6QixZQUFZLEVBQUUsS0FBSztJQUNuQixZQUFZLEVBQUUsTUFBTTtDQUNyQixDQUFDO0FBQ0YsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFjO0lBQ25DLEdBQUcsV0FBVztJQUNkLEtBQUssRUFBRSxNQUFNO0lBQ2IsUUFBUSxFQUFFLFFBQVE7SUFDbEIsTUFBTSxFQUFFLFdBQVc7Q0FDcEIsQ0FBQTtBQUNELE1BQU0sT0FBTyxHQUFHO0lBQ2QseUJBQXlCLEVBQUUsT0FBTztJQUNsQyx5QkFBeUIsRUFBRSxNQUFNO0lBQ2pDLHlCQUF5QixFQUFFLFNBQVM7SUFDcEMseUJBQXlCLEVBQUUsU0FBUztJQUNwQyx5QkFBeUIsRUFBRSxRQUFRO0lBQ25DLDBCQUEwQixFQUFFLFNBQVM7SUFDckMsMEJBQTBCLENBQUMsT0FBTztDQUNuQyxDQUFDO0FBQ0YsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFhLEVBQUUsQ0FBQztBQUM1QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDNUIsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO0FBQ25DLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmU3R5bGVzfSBmcm9tICcuLi9pbnRlcmZhY2Uvc3R5bGVzJztcblxuZXhwb3J0IGNvbnN0IHNsaWRlVGl0bGVTdHlsZTogQWpmU3R5bGVzID0ge1xuICB3aWR0aDogJzEwMCUnLFxuICBkaXNsYXk6ICdibG9jaycsXG4gIG1hcmdpblRvcDogJzMwcHgnLFxufTtcbmV4cG9ydCBjb25zdCB3aWRnZXRUaXRsZVN0eWxlOiBBamZTdHlsZXMgPSB7XG4gIHdpZHRoOiAnMTAwJScsXG4gIGRpc2xheTogJ2Jsb2NrJyxcbiAgYm9yZGVyVG9wOiAnMXB4IGRhc2hlZCBncmF5JyxcbiAgbWFyZ2luVG9wOiAnMTVweCcsXG4gIHBhZGRpbmc6ICcxMHB4JyxcbiAgcGFkZGluZ1RvcDogJzIwcHgnLFxuICBtYXhIZWlnaHQ6ICc2MDBweCcsXG59O1xuZXhwb3J0IGNvbnN0IGJveFN0eWxlOiBBamZTdHlsZXMgPSB7XG4gIGRpc2xheTogJ2Jsb2NrJyxcbiAgcGFkZGluZzogJzEwcHgnLFxufTtcbmV4cG9ydCBjb25zdCBpbmRpY2F0b3JTdHlsZTogQWpmU3R5bGVzID0ge1xuICBmb250U2l6ZTogJzMwcHgnLFxufTtcbmV4cG9ydCBjb25zdCB3aWRnZXRTdHlsZTogQWpmU3R5bGVzID0ge1xuICBib3JkZXI6ICcxcHggZG90dGVkIGdyYXknLFxuICBib3JkZXJSYWRpdXM6ICc2cHgnLFxuICBtYXJnaW5Cb3R0b206ICcxMHB4Jyxcbn07XG5leHBvcnQgY29uc3QgY2hhcnRTdHlsZTogQWpmU3R5bGVzID0ge1xuICAuLi53aWRnZXRTdHlsZSxcbiAgd2lkdGg6ICcxMDAlJyxcbiAgbWF4V2lkdGg6ICcxMDAwcHgnLFxuICBtYXJnaW46ICcxMHB4IGF1dG8nLFxufVxuY29uc3QgYmdDb2xvciA9IFtcbiAgJ3JnYmEoNTQsIDE2MiwgMjM1LCAwLjYpJywgLy8gYmx1ZVxuICAncmdiYSgyNTUsIDk5LCAxMzIsIDAuNiknLCAvLyByZWRcbiAgJ3JnYmEoMjU1LCAxNTksIDY0LCAwLjYpJywgLy8gb3JhbmdlXG4gICdyZ2JhKDI1NSwgMjA1LCA4NiwgMC42KScsIC8vIHllbGxvd1xuICAncmdiYSg3NSwgMTkyLCAxOTIsIDAuNiknLCAvLyBncmVlblxuICAncmdiYSgxNTMsIDEwMiwgMjU1LCAwLjYpJywgLy8gcHVycGxlXG4gICdyZ2JhKDIwMSwgMjAzLCAyMDcsIDAuNiknIC8vIGdyZXlcbl07XG5leHBvcnQgY29uc3QgYmFja2dyb3VuZENvbG9yOiBzdHJpbmdbXSA9IFtdO1xuZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gIGJhY2tncm91bmRDb2xvci5wdXNoKC4uLmJnQ29sb3IpO1xufVxuIl19