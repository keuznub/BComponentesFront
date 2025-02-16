import img from '../assets/shoppingcart_80945.svg'

function OffCanvasButton() {
    return (
        <div className="order-10">
            <button className="cursor-pointer h-full px-4 py-4 -m-4 "  type='button' data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example">
                <img src={img} className='w-5' alt="" />
            </button>
        </div>
    )
}

export default OffCanvasButton