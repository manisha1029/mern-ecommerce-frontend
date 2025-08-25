export function fetchAllProducts() {
  return new Promise(async resolve => {
    // TODO: we will not hard code server url here.
    const response = await fetch('http://localhost:3001/products');
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductById(id) {
  return new Promise(async resolve => {
    // TODO: we will not hard code server url here.
    const response = await fetch(`http://localhost:3001/products/${id}`);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilter(filter, sort, pagination) {
  // category = {category: ['smartphones', 'laptops']}
  // sort = {_sort: 'price', _order: 'asc'}
  // pagination = {_page: 1, _limit: 10}
  // TODO: On server we will support multiple categories
  let queryString = '';
  for (const key in filter) {
    const categoryVal = filter[key];
    if (categoryVal) {
      if (categoryVal.length > 0) {
        const lastCategory = categoryVal[categoryVal.length - 1];
        queryString += `${key}=${lastCategory}&`;
      }
    }
  }

  for (const key in sort) {
    if (sort[key]) {
      queryString += `${key}=${sort[key]}&`;
    }
  }

  for (const key in pagination) {
    if (pagination[key]) {
      queryString += `${key}=${pagination[key]}&`;
    }
  }

  return new Promise(async resolve => {
    // TODO: we will not hard code server url here.
    const response = await fetch(
      `http://localhost:3001/products?${queryString}`
    );
    const data = await response.json();
    resolve({ data });
  });
}
