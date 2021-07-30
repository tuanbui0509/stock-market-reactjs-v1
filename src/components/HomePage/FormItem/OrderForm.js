import React, { useState ,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ConfirmForm from './ConfirmForm';

const OrderForm = (props) => {
   
    const user = useSelector(state => state.User);
    const LightningTableList = useSelector(state => state.LightningTableList);
    const [order, setOrder] = useState({
        idAcc: "",
        stockId: "",
        price: "",
        weight: "",
        pin: "",
        selectedStatus: true// Trạng thái mua bán mua: true, bán: false
    });
    //const [form,setForm] = useState({});
    const [bank, setBank] = useState({
        nganhang: "",
        sodu: -1
    });
    const [stock, setStock] = useState({kl:-1,gia:-1});

    useEffect(() => {
        if(user){
            let index =findIndex(order.idAcc,user.listTaiKhoan);
            if(index!==-1)
            setBank({nganhang:user.listTaiKhoan[index].nganhang,
                sodu:user.listTaiKhoan[index].sodu}); 
        }
    }, [order.idAcc]);
    useEffect(() => {

        let index =findIndexStock(order.stockId,LightningTableList);
        console.log(index);
        console.log(order.stockId);

        if(index!==-1)
            setStock(LightningTableList[index]); 
    }, [order.stockId,stock.kl,stock.gia]);

    let findIndex = (id,list)=>{
        for(let i = 0;i<list.length;i++)
            if(list[i].stk.trim()===id)
                return i;
        return -1;
    }
    let findIndexStock = (id,list)=>{
        for(let i = 0;i<list.length;i++)
            if(list[i].macp.trim()===id)
                return i;
        return -1;
    }
    let listbank =  user? user.listTaiKhoan.map((val,index)=>{
        return <li>{val.stk}</li>
    }):null;
    let element = LightningTableList.map((value, index) => {
        return <li>{value.macp}</li>
    })
    const dispatch = useDispatch();
    const history = useHistory();
    let closeForm = () => {
        let my_modal = document.getElementById('my-modal');
        my_modal.style.visibility = 'hidden';
        my_modal.style.opacity = 0;
        setOrder({
            idAcc: "",
            stockId: "",
            price: "",
            weight: "",
            pin: "",
            selectedStatus: true
        })
       
    }

   

    let searchListAcc = () => {
        let input, list;
        list = document.getElementById("listBankAccount");
        input = document.getElementById("idAcc");
        searchList(input, list, 'idAcc');

    }

    let searchListStock = () => {
        let input, list;
        input = document.getElementById("stockId");
        list = document.getElementById("listStock");
        searchList(input, list, 'stockId');
        let value = input.value;
        setOrder({
            ...order,
            stockId: value
        })
    }

    let searchList = (input, list, label) => {
        let filter, li, i, txtValue;
        list.style.display = 'block';
        filter = input.value.toUpperCase();
        li = list.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
            txtValue = li[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
        list.onclick = function (event) {
            var target = getEventTarget(event);
            input.value = target.innerText;
            list.style.display = 'none';
            if (label === "idAcc") {
                setOrder({
                    ...order,
                    idAcc: input.value
                })
            } else {
                setOrder({
                    ...order,
                    stockId: input.value
                })
            }
        };

        if (input.value.length === 0) {
            list.style.display = 'none';
        }
    }

    function getEventTarget(e) {
        e = e || window.event;
        return e.target || e.srcElement;
    }

    let focusList = (input, list, label) => {
        let txtValue, filter, li, i;
        if (input.value.length === 0) {
            list.style.display = 'none';
        } else {
            list.style.display = 'block';
        }

        li = list.getElementsByTagName("li");
        filter = input.value.toUpperCase();
        for (i = 0; i < li.length; i++) {
            txtValue = li[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
        list.onclick = function (event) {
            var target = getEventTarget(event);
            input.value = target.innerText;
            list.style.display = 'none';
            if (label === "idAcc") {
                setOrder({
                    ...order,
                    idAcc: input.value
                })
            } else {
                setOrder({
                    ...order,
                    stockId: input.value
                })
            }
        };
    }

    let focusListAcc = () => {
        let input, list;
        input = document.getElementById("idAcc");
        list = document.getElementById("listBankAccount");
        focusList(input, list, 'idAcc');
    }

    let focusListStock = () => {
        let input, list;
        input = document.getElementById("stockId");
        list = document.getElementById("listStock");
        focusList(input, list, 'stockId');
    }

    const onSubmitFormOrder = (e) => {
        e.preventDefault();
        let my_modal = document.getElementById('confirm-modal');
        my_modal.style.visibility = 'visible';
        my_modal.style.opacity = 1;
    }

    const handleOnChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        if (name === 'radio') {
            console.log('hihi');
            setOrder({
                ...order,
                selectedStatus: target.value === 'true' ? true : false
            })
        }
        else setOrder({
            ...order,
            [name]: value
        })
        console.log(order);
    }


    const onBlur = () => {
        // let listStock = document.getElementById("listStock");
        // let listBankAccount = document.getElementById("listBankAccount");
        // listStock.style.display = 'none'
        // listBankAccount.style.display = 'none'
    }

    return (
        <div>
            <section id="my-modal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-header">
                        <h5 className="modal-header__title">Đặt lệnh</h5>
                        <i className="far fa-times-circle  modal-header__icon-close" onClick={closeForm} />
                    </div>
                    <div className="modal-content">
                        <div className="modal-body">
                            <form className="modal-form" onSubmit={onSubmitFormOrder}>
                                <div className="form-input">
                                    <div className="form-item">
                                        <label htmlFor="idAcc">Số tài khoản</label>
                                        <input
                                            required
                                            id="idAcc"
                                            type="number"
                                            value={order.idAcc}
                                            name="idAcc"
                                            placeholder={1000105}
                                            onKeyUp={searchListAcc}
                                            onFocus={focusListAcc}
                                            onBlur={onBlur}
                                            onChange={handleOnChange}
                                        />
                                        <ul id="listBankAccount">
                                        {listbank}

                                        </ul>
                                    </div>
                                    <div className="form-item">
                                        <label htmlFor="stockId">Mã CK</label>
                                        <input
                                            name="stockId"
                                            required
                                            id="stockId"
                                            value={order.stockId}
                                            type="text"
                                            placeholder="BHD"
                                            onBlur={onBlur}
                                            onChange={handleOnChange}
                                            onKeyUp={searchListStock}
                                            onFocus={focusListStock}
                                        />
                                        <ul id="listStock">
                                            {element}

                                        </ul>
                                    </div>
                                    <label htmlFor="totalPrice" className="totalPrice">Số tiền trong tài khoản: <strong>{bank.sodu} VNĐ</strong></label>
                                    <div className="form-item">
                                        <label htmlFor="weight">Khối lượng</label>
                                        <input
                                            onBlur={onBlur}
                                            onChange={handleOnChange}
                                            name="weight"
                                            required
                                            id="weight"
                                            type="number"
                                            value={order.weight}
                                            placeholder={1000} />
                                    </div>
                                    <div className="form-item">
                                        <label htmlFor="price">Giá đặt</label>
                                        <input
                                            onBlur={onBlur}
                                            onChange={handleOnChange}
                                            name="price"
                                            required
                                            id="price"
                                            value={order.price}
                                            type="number"
                                            placeholder={1000105} />
                                    </div>
                                    <div className="form-item">
                                        <label htmlFor="pin">Mã PIN</label>
                                        <input
                                            onBlur={onBlur}
                                            onChange={handleOnChange}
                                            name="pin"
                                            required
                                            id="pin"
                                            value={order.pin}
                                            type="password"
                                            placeholder="******" />
                                    </div>
                                </div>
                                <div className="form-radio">
                                    <div className="radio-tile-group">
                                        <div className="input-container">
                                            <input
                                                id="buy"
                                                className="radio-button"
                                                type="radio"
                                                name="radio"
                                                value={true}
                                                onChange={handleOnChange}
                                                checked={order.selectedStatus}
                                            />
                                            <div className="radio-tile">
                                                <label htmlFor="buy" className="radio-tile-label">Mua</label>
                                            </div>
                                        </div>
                                        <div className="input-container">
                                            <input
                                                id="sell"
                                                className="radio-button"
                                                type="radio"
                                                name="radio"
                                                value={false}
                                                onChange={handleOnChange}
                                                checked={!order.selectedStatus}
                                            />
                                            <div className="radio-tile">
                                                <label htmlFor="sell" className="radio-tile-label">Bán</label>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                                <div className="form-submit">
                                    <button className="btn btn--green">Xác nhận</button>
                                </div>
                            </form>
                        </div>
                        <div className="modal-show-stock">
                            <div className="modal-order-matching">
                                <p className="order-matching-title">Khớp lệnh</p>
                                <span className="order-matching-price">Giá: {stock.gia}</span>
                                <span>-</span>
                                <span className="order-matching-weight">Số lượng: {stock.kl}</span>
                            </div>
                            <div className="compare-stock">
                                <div className="info-stock info-ceil">
                                    <label htmlFor>Trần: </label>
                                    <span className="ceil">{stock.giaTran}</span>
                                </div>
                                <div className="info-stock info-standard">
                                    <label htmlFor>TC: </label>
                                    <span className="standard">{stock.giaTC}</span>
                                </div>
                                <div className="info-stock info-floor">
                                    <label htmlFor>Sàn: </label>
                                    <span className="floor">{stock.giaSan}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <span> <strong>Hướng dẫn:</strong> 1000 đồng - Đơn vị khối lượng: 1 cổ phiếu - Đơn vị tiền: đồng</span>
                    </div>
                </div>
            </section>
            <ConfirmForm confirmOrder={order} closeForm={closeForm}/>
        </div>
    );
}

export default OrderForm;
