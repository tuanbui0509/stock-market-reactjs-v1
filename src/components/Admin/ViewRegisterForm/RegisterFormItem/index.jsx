import { CheckCircleTwoTone, DeleteTwoTone } from '@ant-design/icons'
import React from 'react'

export default function RegisterFormItem(props) {
    let { formRegister, index } = props
    return (
        <tr>
            <td >{index + 1}</td>
            <td >{formRegister.maDon}</td>
            <td >{`${formRegister.ho} ${formRegister.ten}`}</td>
            <td >{`${formRegister.phai ? 'Nam' : 'Nữ'}`} </td>
            <td >{formRegister.noiSinh}</td>
            <td >{formRegister.diaChi}</td>
            <td >{formRegister.email}</td>
            <td >{formRegister.sdt}</td>
            <td className="right__iconTable"><a><CheckCircleTwoTone style={{ fontSize: '20px' }} /></a></td>
            <td className="right__iconTable"><a><DeleteTwoTone style={{ fontSize: '20px' }} /></a></td>
        </tr>
    )
}
