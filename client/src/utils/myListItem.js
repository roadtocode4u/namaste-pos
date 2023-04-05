export const myProductListItems =
  JSON.parse(localStorage.getItem('list')) || [];

export const myProductListCount = myProductListItems.length;
