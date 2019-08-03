import {Col, Row} from "react-grid-system";
import Detail from "../../common/Detail";
import * as React from "react";
import {getMembershipTypeText} from "../MembershipType";

interface Props{
    member :any;
}
export default function MemberMainInfo(props:Props) {
    return <Row>
        <Col>
            <Detail value={props.member.title} label={"Title"}/>
            <Detail value={props.member.name} label={"Name"}/>
            <Detail value={props.member.phone} label={"Phone"}/>
            <Detail value={props.member.phone2} label={"Secondary Phone"}/>
            <Detail value={props.member.email} label={"Email"}/>
            <Detail value={props.member.address} label={"Address"}/>
            <Detail value={props.member.jobTitle} label={"Job"}/>
            <Detail value={props.member.birthDate} label={"BirthDate"}/>
        </Col>
        <Col>
            <Detail value={props.member.joinDate} label={"JoinDate"}/>
            <Detail value={props.member.expirationDate} label={"ExpirationDate"}/>
            <Detail value={props.member.passportExpirationDate} label={"Passport ExpirationDate"}/>
            <Detail value={props.member.passportNo} label={"Passport No"}/>
            <Detail value={props.member.disabled ? 'DISABLED' : 'ACTIVE'} label={"Status"}/>
            <Detail value={props.member.archived ? 'ARCHIVED' : undefined} label={"Archive Status"}/>
            <Detail value={getMembershipTypeText(props.member.type)} label={"Membership Type"}/>
        </Col>
    </Row>
}

