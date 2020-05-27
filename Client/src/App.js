import React from "react";
import AppRouter from "./router/AppRouter";
//get state provider
import AccountState from "./contexts/account/AccountState";
import AgencyState from "./contexts/agency/AgencyState";
import AuthState from "./contexts/auth/AuthState";
import BookState from "./contexts/book/BookState";
import EmployeeState from "./contexts/employee/EmployeeState";
import ExportationState from "./contexts/export/ExportationState";
import ImportationState from "./contexts/import/ImportationState";
import ItemState from "./contexts/item/ItemState";
import OrderState from "./contexts/order/OrderState";
import VendorState from "./contexts/vendor/VendorState";
import WarehouseState from "./contexts/warehouse/WarehouseState";
import $ from "jquery";

require("dotenv").config();

function App() {
  return (
    <AuthState>
      <AccountState>
        <AgencyState>
          <BookState>
          <EmployeeState>
            <ExportationState>
              <ImportationState>
                <OrderState>
                  <VendorState>
                    <WarehouseState>
                      <ItemState>
                        <AppRouter />
                      </ItemState>
                    </WarehouseState>
                  </VendorState>
                </OrderState>
              </ImportationState>
            </ExportationState>
          </EmployeeState>
          </BookState>
        </AgencyState>
      </AccountState>
    </AuthState>
  );
}

export default App;
