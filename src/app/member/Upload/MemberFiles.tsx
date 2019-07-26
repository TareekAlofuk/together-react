import * as React from "react";
import {useState} from "react";
import {Button} from "semantic-ui-react";
import Config from "../../../bootstrap/Config";
import Axios from "axios";
import {removeItemAtIndex} from "reduxpp/dist/action/FetchArrayAction";
import ReduxActions from "../../../bootstrap/ReduxActions";
import {connect} from "react-redux";

interface Props {
    files: any[];
}

export default class MemberFiles extends React.Component<Props> {

    render(): JSX.Element {
        return (
            <div className={'member-files'}>
                {
                    <div className={'member-file-list'}>
                        {
                            this.props.files.map((file: any, index: number) => {
                                return <div key={index} className={'file-list-item'}>
                                    <p>{file.displayFileName}</p>
                                    <div className={'actions'}>
                                        <DeleteButtonContainer fileId={file.id} index={index}/>
                                        <a target={'_blank'} className={'ui icon blue button'}
                                           href={Config.SERVER_URL + 'storage/' + file.fileName}
                                           color={'blue'}>
                                            <i className={'icon download cloud'}/>
                                        </a>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                }
            </div>
        )
    }

}


function DeleteButton(props: any) {
    let [loading, setLoading] = useState(false);
    return <Button loading={loading} disabled={loading} onClick={() => {
        setLoading(true);
        const url = Config.SERVER_URL + `api/members/attachment/${props.fileId}`;
        Axios.delete(url)
            .then(() => {
                setLoading(false);
                const action = removeItemAtIndex(ReduxActions.GET_MEMBER_ATTACHMENTS, props.index);
                props.dispatch(action);
            })
            .catch(() => setLoading(false))
    }} icon={'trash'} color={'red'}/>
}

const DeleteButtonContainer = connect()(DeleteButton);