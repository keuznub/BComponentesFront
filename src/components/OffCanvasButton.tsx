import img from '../assets/shoppingcart_80945.svg'

function OffCanvasButton() {
    return (
        <div className="order-10">
            <button className="cursor-pointer h-full px-4 hover:bg-orange-700" type='button' data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example">
                <img src={img} className='w-5' alt="" />
            </button>
        </div>
    )
}

export default OffCanvasButton