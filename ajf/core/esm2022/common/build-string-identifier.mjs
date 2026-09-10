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
const defaultOpts = {
    emptyString: 'Not specified',
    entriesDivider: ' - ',
    labelSuffix: ': ',
    valuesDivider: ', ',
};
export const buildStringIdentifierOpts = (opts) => ({ ...defaultOpts, ...opts });
export const buildStringIdentifier = (stringIdentifier, context, opts) => {
    const strings = { ...defaultOpts, ...opts };
    if (stringIdentifier == null) {
        return strings.emptyString;
    }
    const str = stringIdentifier.map(s => {
        const values = [];
        if (s.value != null && s.value.length > 0) {
            s.value.forEach(curValue => {
                const vp = curValue.split('.');
                let curContext = context;
                let val = null;
                vp.forEach(k => {
                    if (curContext[k] !== undefined) {
                        val = context[k];
                        curContext = context[k];
                    }
                });
                if (val != null && val instanceof Array && val.length > 0) {
                    val = val.map(v => `${v}`).join(', ');
                }
                if (val != null) {
                    values.push(`${val}`);
                }
            });
        }
        return `${s.label}: ${values.length > 0 ? values.join(', ') : strings.emptyString}`;
    });
    return str.join(' - ');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQtc3RyaW5nLWlkZW50aWZpZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2NvbW1vbi9zcmMvYnVpbGQtc3RyaW5nLWlkZW50aWZpZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBb0JILE1BQU0sV0FBVyxHQUFHO0lBQ2xCLFdBQVcsRUFBRSxlQUFlO0lBQzVCLGNBQWMsRUFBRSxLQUFLO0lBQ3JCLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLGFBQWEsRUFBRSxJQUFJO0NBQ3BCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSx5QkFBeUIsR0FBRyxDQUN2QyxJQUFnQyxFQUNLLEVBQUUsQ0FBQyxDQUFDLEVBQUMsR0FBRyxXQUFXLEVBQUUsR0FBRyxJQUFJLEVBQUMsQ0FBQyxDQUFDO0FBRXRFLE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFHLENBQ25DLGdCQUFtRCxFQUNuRCxPQUFtQixFQUNuQixJQUFnQyxFQUN4QixFQUFFO0lBQ1YsTUFBTSxPQUFPLEdBQUcsRUFBQyxHQUFHLFdBQVcsRUFBRSxHQUFHLElBQUksRUFBd0MsQ0FBQztJQUNqRixJQUFJLGdCQUFnQixJQUFJLElBQUksRUFBRSxDQUFDO1FBQzdCLE9BQU8sT0FBTyxDQUFDLFdBQVcsQ0FBQztJQUM3QixDQUFDO0lBQ0QsTUFBTSxHQUFHLEdBQWEsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQzdDLE1BQU0sTUFBTSxHQUFhLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQzFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUN6QixNQUFNLEVBQUUsR0FBYSxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUM7Z0JBQ3pCLElBQUksR0FBRyxHQUFRLElBQUksQ0FBQztnQkFDcEIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDYixJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUUsQ0FBQzt3QkFDaEMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDakIsVUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDMUIsQ0FBQztnQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRyxZQUFZLEtBQUssSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO29CQUMxRCxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hDLENBQUM7Z0JBQ0QsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7b0JBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUN4QixDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0QsT0FBTyxHQUFHLENBQUMsQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0RixDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6QixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dH0gZnJvbSAnLi9jb250ZXh0JztcbmltcG9ydCB7QWpmU3RyaW5nSWRlbnRpZmllcn0gZnJvbSAnLi9zdHJpbmctaWRlbnRpZmllcic7XG5cbi8qKlxuICogZW1wdHlTdHJpbmc6IHRoZSBzdHJpbmcgZGlzcGxheWVkIHdoZW4gdGhlIGNvbnRleHQgaGFzIG5vIG1hdGNoLlxuICogZW50cmllc0RpdmlkZXI6IHRoZSBzdHJpbmcgZGlzcGxhdXllZCBiZWV0d2VuIGVudHJpZXNcbiAqIGxhYmVsU3VmZml4OiB0aGUgc3RyaW5nIGRpc3BsYXllZCBiZXR3ZWVuIHRoZSBsYWJlbCBhbmQgaXRzIHZhbHVlc1xuICogdmFsdWVzRGl2aWRlcjogdGhlIHN0cmluZyBkaXNwYXllZCBiZXR3ZWVuIHZhbHVlc1xuICogQGV4cG9ydFxuICogQGludGVyZmFjZSBCdWlsZFN0cmluZ0lkZW50aWZpZXJPcHRzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQnVpbGRTdHJpbmdJZGVudGlmaWVyT3B0cyB7XG4gIGVtcHR5U3RyaW5nPzogc3RyaW5nO1xuICBlbnRyaWVzRGl2aWRlcj86IHN0cmluZztcbiAgbGFiZWxTdWZmaXg/OiBzdHJpbmc7XG4gIHZhbHVlc0RpdmlkZXI/OiBzdHJpbmc7XG59XG5cbmNvbnN0IGRlZmF1bHRPcHRzID0ge1xuICBlbXB0eVN0cmluZzogJ05vdCBzcGVjaWZpZWQnLFxuICBlbnRyaWVzRGl2aWRlcjogJyAtICcsXG4gIGxhYmVsU3VmZml4OiAnOiAnLFxuICB2YWx1ZXNEaXZpZGVyOiAnLCAnLFxufTtcblxuZXhwb3J0IGNvbnN0IGJ1aWxkU3RyaW5nSWRlbnRpZmllck9wdHMgPSAoXG4gIG9wdHM/OiBCdWlsZFN0cmluZ0lkZW50aWZpZXJPcHRzLFxuKTogUmVxdWlyZWQ8QnVpbGRTdHJpbmdJZGVudGlmaWVyT3B0cz4gPT4gKHsuLi5kZWZhdWx0T3B0cywgLi4ub3B0c30pO1xuXG5leHBvcnQgY29uc3QgYnVpbGRTdHJpbmdJZGVudGlmaWVyID0gKFxuICBzdHJpbmdJZGVudGlmaWVyOiBBamZTdHJpbmdJZGVudGlmaWVyW10gfCB1bmRlZmluZWQsXG4gIGNvbnRleHQ6IEFqZkNvbnRleHQsXG4gIG9wdHM/OiBCdWlsZFN0cmluZ0lkZW50aWZpZXJPcHRzLFxuKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgc3RyaW5ncyA9IHsuLi5kZWZhdWx0T3B0cywgLi4ub3B0c30gYXMgUmVxdWlyZWQ8QnVpbGRTdHJpbmdJZGVudGlmaWVyT3B0cz47XG4gIGlmIChzdHJpbmdJZGVudGlmaWVyID09IG51bGwpIHtcbiAgICByZXR1cm4gc3RyaW5ncy5lbXB0eVN0cmluZztcbiAgfVxuICBjb25zdCBzdHI6IHN0cmluZ1tdID0gc3RyaW5nSWRlbnRpZmllci5tYXAocyA9PiB7XG4gICAgY29uc3QgdmFsdWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGlmIChzLnZhbHVlICE9IG51bGwgJiYgcy52YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICBzLnZhbHVlLmZvckVhY2goY3VyVmFsdWUgPT4ge1xuICAgICAgICBjb25zdCB2cDogc3RyaW5nW10gPSBjdXJWYWx1ZS5zcGxpdCgnLicpO1xuICAgICAgICBsZXQgY3VyQ29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIGxldCB2YWw6IGFueSA9IG51bGw7XG4gICAgICAgIHZwLmZvckVhY2goayA9PiB7XG4gICAgICAgICAgaWYgKGN1ckNvbnRleHRba10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFsID0gY29udGV4dFtrXTtcbiAgICAgICAgICAgIGN1ckNvbnRleHQgPSBjb250ZXh0W2tdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh2YWwgIT0gbnVsbCAmJiB2YWwgaW5zdGFuY2VvZiBBcnJheSAmJiB2YWwubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHZhbCA9IHZhbC5tYXAodiA9PiBgJHt2fWApLmpvaW4oJywgJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgdmFsdWVzLnB1c2goYCR7dmFsfWApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGAke3MubGFiZWx9OiAke3ZhbHVlcy5sZW5ndGggPiAwID8gdmFsdWVzLmpvaW4oJywgJykgOiBzdHJpbmdzLmVtcHR5U3RyaW5nfWA7XG4gIH0pO1xuICByZXR1cm4gc3RyLmpvaW4oJyAtICcpO1xufTtcbiJdfQ==