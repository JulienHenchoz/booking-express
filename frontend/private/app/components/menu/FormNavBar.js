import React from "react";
import FixedNavBar from '../menu/FixedNavBar';
import {Icon} from 'react-materialize';

export default ({title, subtitle, icon, showRemoveBtn, onValidate, onRemove}) => (
    <div>
        <FixedNavBar icon={icon}>
            <ul id="action-buttons" className="right">
                {showRemoveBtn &&
                <li>
                    <a className="waves-effect" href="#" onClick={onRemove}>
                        <Icon>delete</Icon>
                    </a>
                </li>
                }

                <li>
                    <a className="waves-effect" href="#" onClick={onValidate}>
                        <Icon>done</Icon>
                    </a>
                </li>
            </ul>
        </FixedNavBar>
    </div>
);
