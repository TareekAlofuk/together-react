import * as React from "react";
import {Button, Icon} from "semantic-ui-react";
import FileDropZone from "./FileDropZone";
import Config from "../../../bootstrap/Config";

interface Props {
    files: any[];
}

export default class MemberFiles extends React.Component<Props> {

    render(): JSX.Element {
        return (
            <div className={'member-files'}>
                <h3>Member Files : </h3>
                {
                    <div className={'member-file-list'}>
                        {
                            this.props.files.map((file: any, index: number) => {
                                return <div key={index} className={'file-list-item'}>
                                    <p>{file.displayFileName}</p>
                                    <div className={'actions'}>
                                        <Button icon={'trash'} color={'red'}/>
                                        <Button icon={'cloud download'} color={'blue'}/>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                }
                {
                    this.props.files.length === 0 &&
                    <div>
                        <Icon size={'large'} name={'database'}/>
                        <br/>
                        <p>NO FILES ATTACHED TO MEMBER FILES</p>
                    </div>
                }

                <FileDropZone label={"Upload File"}
                              uploadUrl={Config.SERVER_URL + "api/members/attachment"}
                              name={"file"}/>
            </div>
        )
    }

}