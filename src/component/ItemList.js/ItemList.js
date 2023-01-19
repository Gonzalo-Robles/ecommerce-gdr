//import {getProducts} from '../../asyncMock'
import Item from '../Item/Item'


const ItemList = ({products}) =>{
    return (
        <div style={{justifyContent:'center'}}>
            {
            products.map(product => <Item key={product.id} product={product} />)
            }
        </div>
    )
}
export default ItemList