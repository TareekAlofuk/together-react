import * as React from "react";
import {useState} from "react";
import {Link} from "react-router-dom";

export default function ServiceBaseMenuOptions(): JSX.Element {
    const [activeOption, setActiveOption] = useState('');
    return <div className={'page-menu'}>

        <Link className={'page-menu-option' + ` ${activeOption === 'register' ? 'active' : ''}`}
              onClick={() => setActiveOption('register')}
              to={'/services'}>Register Service</Link>

        <Link className={'page-menu-option' + ` ${activeOption === 'delete-service' ? 'active' : ''}`}
              onClick={() => setActiveOption('delete-service')}
              to={'/services/delete'}>Delete Service</Link>

        <Link className={'page-menu-option' + ` ${activeOption === 'report' ? 'active' : ''}`}
              onClick={() => setActiveOption('report')}
              to={'/services/usage'}>Service Report</Link>

        <div className={'page-menu-option' + ` ${activeOption === 'store' ? 'active' : ''}`}
             onClick={() => setActiveOption('store')}
             style={{color: '#AAA'}}>Service Store
        </div>

        <div style={{color: '#AAA'}} className={'page-menu-option' + ` ${activeOption === 'store' ? 'active' : ''}`}
             onClick={() => setActiveOption('store')}>
            Service Rules
        </div>

    </div>;
}