import * as React from "react";
import {useState} from "react";
import {Link} from "react-router-dom";

export default function WalletBaseMenuOptions(): JSX.Element {
    const [activeOption, setActiveOption] = useState('');
    return <div className={'page-menu'}>

        <Link className={'page-menu-option' + ` ${activeOption === 'deposit' ? 'active' : ''}`}
              onClick={() => setActiveOption('deposit')}
              to={'/wallet/deposit'}>Deposit</Link>

        <Link className={'page-menu-option' + ` ${activeOption === 'withdraw' ? 'active' : ''}`}
              onClick={() => setActiveOption('withdraw')}
              to={'/wallet/withdraw'}>Withdraw</Link>

        <Link className={'page-menu-option' + ` ${activeOption === 'report' ? 'active' : ''}`}
              onClick={() => setActiveOption('report')}
              to={'/wallet/report'}>Report</Link>

    </div>;
}