import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ProductActions } from 'app/ngrx/products/actions';
import { IProducts, IStockItems } from '@eps/models';

export const productsFeatureKey = 'products';

export interface State extends EntityState<IProducts> {
  selectedProductId: number | null;
  selectedStockItemId: number | null;
  selectedStockItem: IStockItems | null;
}

export const adapter: EntityAdapter<IProducts> = createEntityAdapter<IProducts>({
  selectId: (product: IProducts) => product.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedProductId: null,
  selectedStockItemId: null,
  selectedStockItem: null,
});

export const reducer = createReducer(
  initialState,
  on(ProductActions.searchWithNoPagingSuccess, (state, { products }) => adapter.addMany(products, state)),
  on(ProductActions.searchWithPagingSuccess, (state, { payload }) => adapter.addMany(payload.products, state)),
  on(ProductActions.loadProduct, (state, { product }) => adapter.addOne(product, state)),
  on(ProductActions.selectProduct, (state, { id }) => ({
    ...state,
    selectedProductId: id,
  })),
  on(ProductActions.selectStockItem, (state, { stockItem }) => ({
    ...state,
    selectedStockItemId: stockItem.id,
    selectedStockItem: stockItem,
  }))
);

export const getSelectedId = (state: State) => state.selectedProductId;

export const getSelectedStockItemId = (state: State) => state.selectedStockItemId;

export const getSelectedStockItem = (state: State) => state.selectedStockItem;
