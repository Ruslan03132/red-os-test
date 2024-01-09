/**
 * Функция рекурсивно проходит по древовидному массиву arr и фильтрует его по полю marker.
 * Если marker true, то элемент добавляется в массив result
 * @typedef {Array.<{key: string, name: string, marker:boolean, chilren: arr}>} result
 * @param {Array.<{key: string, name: string, marker:boolean, chilren: arr}>} arr - json дерево элементов с полями key, name, marker, children
 * @returns {result} древовидный массив arr отфильтрованный по полю marker
 */
const deepFilterTree = (arr) => {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        if (Array.isArray(item)) {
            result.push(deepFilterTree(item));
        } else if (typeof item === "object" && item !== null) {
            if (!item.marker) {
                continue;
            }
            result.push(
                deepFilterTree(Object.entries(item)).reduce(
                    (acc, [key, value]) => {
                        acc[key] = value;
                        return acc;
                    },
                    {}
                )
            );
        } else {
            result.push(item);
        }
    }

    return result;
};

export default deepFilterTree;
