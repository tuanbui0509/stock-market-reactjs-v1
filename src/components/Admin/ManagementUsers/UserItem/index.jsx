import { CheckCircleTwoTone, DeleteTwoTone } from '@ant-design/icons'
import React from 'react'

export default function RegisterFormItem(props) {
    let { user, index } = props
    return (
        <tr>
            <td >{index + 1}</td>
            <td >{user.maNdt}</td>
            <td >{`${user.ho} ${user.ten}`}</td>
            <td >{`${user.phai ? 'Nam' : 'Nữ'}`} </td>
            <td >{user.ngaySinh}</td>
            <td >{user.noiSinh}</td>
            <td >{user.diaChi}</td>
            <td >{user.email}</td>
            <td >{user.sdt}</td>
            <td >{user.cmnd}</td>
        </tr>
    )
}
