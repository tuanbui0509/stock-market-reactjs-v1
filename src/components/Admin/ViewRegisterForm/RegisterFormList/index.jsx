import React from 'react'

export default function RegisterFormList(props) {
    return (
        <>
            <div className="right__title">Bảng điều khiển</div>
            <p className="right__desc">Xem duyệt đơn khách hàng</p>
            <div className="right__table">
                <div className="right__tableWrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã đơn</th>
                                <th>Họ Tên</th>
                                <th>Giới tính</th>
                                <th>Nơi sinh</th>
                                <th>Địa chỉ</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Chấp nhận</th>
                                <th>Xoá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.children}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
