// * Dispatch Action type

// ! Account
export const CREATE_ACCOUNT = "CREATE_ACCOUNT";
export const GET_ACCOUNT = "GET_ACCOUNT";
export const DELETE_ACCOUNT = "DELETE_ACCOUNT";
export const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";
export const SEARCH_ACCOUNT = "SEARCH_ACCOUNT";

// ! Admin
export const CREATE_ADMIN = "CREATE_ADMIN";
export const GET_ADMIN = "GET_ADMIN";
export const DELETE_ADMIN = "DELETE_ADMIN";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";


// ! Agency
export const CREATE_AGENCY = "CREATE_AGENCY";
export const GET_AGENCY = "GET_AGENCY";
export const DELETE_AGENCY = "DELETE_AGENCY";
export const UPDATE_AGENCY = "UPDATE_AGENCY";
export const SEARCH_AGENCY = "SEARCH_AGENCY";

// ! Auth
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const AUTH_ERROR = "AUTH_ERROR";

// ! Book
export const CREATE_BOOK = "CREATE_BOOK";
export const GET_BOOK = "GET_BOOK";
export const GET_ALL_BOOK = "GET_ALL_BOOK";
export const UPDATE_BOOK = "UPDATE_BOOK";
export const DELETE_BOOK = "DELETE_BOOK";
export const SEARCH_BOOK = "SEARCH_BOOK";

// ! Employee
export const CREATE_EMPLOYEE = "CREATE_EMPLOYEE";
export const GET_EMPLOYEE = "GET_EMPLOYEE";
export const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";
export const UPDATE_EMPLOYEE = "UPDATE_EMPLOYEE";
export const SEARCH_EMPLOYEE = "SEARCH_EMPLOYEE";

// ! Export
export const CREATE_EXPORTATION = "CREATE_EXPORTATION";
export const GET_EXPORTATION = "GET_EXPORTATION";
export const DELETE_EXPORTATION = "DELETE_EXPORTATION";
export const UPDATE_EXPORTATION = "UPDATE_EXPORTATION";
export const SEARCH_EXPORTATION = "SEARCH_EXPORTATION";

// ! Import
export const CREATE_IMPORTATION = "CREATE_IMPORTATION";
export const GET_IMPORTATION = "GET_IMPORTATION";
export const DELETE_IMPORTATION = "DELETE_IMPORTATION";
export const UPDATE_IMPORTATION = "UPDATE_IMPORTATION";
export const SEARCH_IMPORTATION = "SEARCH_IMPORTATION";

// ! Item
export const CREATE_ITEM = "CREATE_ITEM";
export const GET_ITEM = "GET_ITEM";
export const GET_ALL_ITEM = "GET_ALL_ITEM";
export const UPDATE_ITEM = "UPDATE_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const SEARCH_ITEM = "SEARCH_ITEM";

// ! order
export const CREATE_ORDER = "CREATE_ORDER";
export const GET_ORDER = "GET_ORDER";
export const DELETE_ORDER = "DELETE_ORDER";
export const UPDATE_ORDER = "UPDATE_ORDER";
export const SEARCH_ORDER = "SEARCH_ORDER";

// ! Vendor
export const CREATE_VENDOR = "CREATE_VENDOR";
export const GET_VENDOR = "GET_VENDOR";
export const DELETE_VENDOR = "DELETE_VENDOR";
export const UPDATE_VENDOR = "UPDATE_VENDOR";
export const SEARCH_VENDOR = "SEARCH_VENDOR";

// ! Warehosue
export const CREATE_WAREHOUSE = "CREATE_WAREHOUSE";
export const GET_WAREHOUSE = "GET_WAREHOUSE";
export const DELETE_WAREHOUSE = "DELETE_WAREHOUSE";
export const UPDATE_WAREHOUSE = "UPDATE_WAREHOUSE";
export const SEARCH_WAREHOUSE = "SEARCH_WAREHOUSE";

// ! categories
export const CREATE_CATEGORY = "CREATE_CATEGORY";
export const GET_CATEGORY = "GET_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";

// ! currents
export const SET_CURRENT = "SET_CURRENT";
export const CLEAR_CURRENT = "CLEAR_CURRENT";

// ! config
export const CONFIG_FORMDATA = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

export const CONFIG_JSON = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const CONFIG_URL_LENCODE = {
  headers: {
    "content-type": "application/x-www-form-urlencoded;charset=utf-8",
  },
};

export const CUSTOM_HEADER = {
  headers: {
    "content-type": "application/json",
    sender: {
      username: "test_acc3",
      password: "test_acc3",
      employeeId: 3,
      role: "Admin",
    },
  },
};

// .env var
export const ENV_DOMAIN = process.env.REACT_APP_DOMAIN;
