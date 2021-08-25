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
            <td className="right__iconTable"><a onClick={(e) => props.handleConfirmChange(formRegister.maDon)}><CheckCircleTwoTone style={{ fontSize: '20px' }} /></a></td>
            <td className="right__iconTable"><a onClick={(e) => props.handleDeleteChange(formRegister.maDon)}><DeleteTwoTone style={{ fontSize: '20px' }} /></a></td>
        </tr>
    )
}
