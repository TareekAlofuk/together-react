import {useState} from "react";
import * as React from "react";

export default function ServiceUsageItem(props: any) {

    const [selected, setSelected] = useState(false);

    return <div className={`service-usage-item ${selected ? 'selected' : ''}`}
                onClick={() => {
                    console.log(props.item, !selected);
                    props.onItemSelected && props.onItemSelected(props.item, !selected);
                    setSelected(!selected);
                }}>
        <span className={'service-name'}>{props.item.serviceName}</span>
        <span>{props.item.time}</span>
        <span>{props.item.referencePerson}</span>
        <span>{props.item.price}</span>
        <span>{props.item.count}</span>
        <span>{props.item.discount}</span>
        <span>{props.item.finalPrice}</span>
    </div>
}