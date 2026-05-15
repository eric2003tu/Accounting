// Central aggregator for typed API clients (single-entry re-exports and default container).
import { apiFetch, setAuthToken } from './clients/appClient';
import { authClient } from './clients/authClient';
import { businessClient } from './clients/businessClient';
import { productsClient } from './clients/productsClient';
import { salesClient } from './clients/salesClient';
import { purchasesClient } from './clients/purchasesClient';
import { usersClient } from './clients/usersClient';
import { categoriesClient } from './clients/categoriesClient';
import { contactsClient } from './clients/contactsClient';
import { warehousesClient } from './clients/warehousesClient';
import { saleItemsClient } from './clients/saleItemsClient';
import { purchaseItemsClient } from './clients/purchaseItemsClient';
import { accountsClient } from './clients/accountsClient';
import { journalEntriesClient } from './clients/journalEntriesClient';
import { journalLinesClient } from './clients/journalLinesClient';
import { fiscalYearsClient } from './clients/fiscalYearsClient';
import { reportsClient } from './clients/reportsClient';
import { notificationsClient } from './clients/notificationsClient';
import { receivablesClient } from './clients/receivablesClient';
import { payablesClient } from './clients/payablesClient';
import { stockMovementsClient } from './clients/stockMovementsClient';
import { businessUsersClient } from './clients/businessUsersClient';

export {
  apiFetch,
  setAuthToken,
  authClient,
  businessClient,
  productsClient,
  salesClient,
  purchasesClient,
  usersClient,
  categoriesClient,
  contactsClient,
  warehousesClient,
  saleItemsClient,
  purchaseItemsClient,
  accountsClient,
  journalEntriesClient,
  journalLinesClient,
  fiscalYearsClient,
  reportsClient,
  notificationsClient,
  receivablesClient,
  payablesClient,
  stockMovementsClient,
  businessUsersClient,
};

export default {
  apiFetch,
  setAuthToken,
  authClient,
  businessClient,
  productsClient,
  salesClient,
  purchasesClient,
  usersClient,
  categoriesClient,
  contactsClient,
  warehousesClient,
  saleItemsClient,
  purchaseItemsClient,
  accountsClient,
  journalEntriesClient,
  journalLinesClient,
  fiscalYearsClient,
  reportsClient,
  notificationsClient,
  receivablesClient,
  payablesClient,
  stockMovementsClient,
  businessUsersClient,
};
