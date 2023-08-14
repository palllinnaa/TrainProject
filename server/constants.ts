export enum Roles {
  ADMIN = "admin",
  SELLER = "seller",
  USER = "user"
}

export enum METHODS {
  GET = "GET",
  POST = "POST"
}

export enum MESSAGE_TYPE {
  SUCCEEDED_TOAST = "SUCCEEDED_TOAST",
  ERROR_TOAST = "ERROR_TOAST",
  INFORMATION_TOAST = "INFORMATION_TOAST",
  SUCCEEDED_CONSOLE = "SUCCEEDED_CONSOLE",
  ERROR_CONSOLE = "ERROR_CONSOLE",
  INFORMATION_CONSOLE = "INFORMATION_CONSOLE"
}

export const isEmpty = (value: any) => value == null || !(Object.keys(value) || value).length;

export const makePaginationFilter = (columnName?, columnLabel?, value?, action?) => {
  return {
    columnName: columnName,
    columnLabel: columnLabel,
    action: action,
    value: value
  };
}

export const changePaginationUrlLocation = (page, limit) => {
  const newURL = "?page=" + page + "&limit=" + limit;
  window.history.replaceState(null, '', newURL);
}