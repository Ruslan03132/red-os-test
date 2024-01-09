/**
 * Функция рекурсивно проходит по древовидному массиву data и добавляет элементам поле marker.
 * Если marker имеет значение true, то строка searchTerm была найдена в этом объекте в поле name или
 * была найдена в любом узле поддерева children этого объекта. Если marker имеет значение
 * false, то строка searchTerm не была найдена ни в поле name этого объекта ни в его потомках.
 * @param {Array.<{key: string, name: string, chilren: data}>} data - json дерево элементов с полями key, name, children
 * @param {string} searchTerm - поисковая строка
 */
const makeMarkerTree = (data, searchTerm) => {
    let markerForParent = false;

    data.forEach((item, index, arr) => {
        if (item.children && item.children.length !== 0) {
            item.marker = makeMarkerTree(item.children, searchTerm);
            if (!item.marker) {
                if (
                    item.name
                        .toLocaleLowerCase()
                        .includes(searchTerm.toLocaleLowerCase())
                ) {
                    item.marker = true;
                    markerForParent = true;
                }
            }
        } else {
            if (
                item.name
                    .toLocaleLowerCase()
                    .includes(searchTerm.toLocaleLowerCase())
            ) {
                item.marker = true;
                markerForParent = true;
            } else {
                item.marker = false;
            }
        }

        if (index === arr.length - 1) {
            arr.forEach((value) => {
                if (value.marker) {
                    markerForParent = true;
                }
            });
        }
    });

    return markerForParent;
};

export default makeMarkerTree;
