// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {useIntl} from 'react-intl';
import {useSelector} from 'react-redux';
import styled from 'styled-components';

import {getLicense} from 'mattermost-redux/selectors/entities/general';

import ExternalLink from 'components/external_link';

import {LicenseLinks} from 'utils/constants';

import './menu_item.scss';

const FreeVersionBadge = styled.div`
     opacity: 0;
`;

type Props = {
    id: string;
}

const MenuStartTrial = (props: Props): JSX.Element | null => {
    const {formatMessage} = useIntl();

    const license = useSelector(getLicense);
    const isCurrentLicensed = license?.IsLicensed;

    if (isCurrentLicensed === 'true') {
        return null;
    }

    return (
        <li
            className={'MenuStartTrial'}
            role='menuitem'
            id={props.id}
        >
            <div className='editionText'>
                {formatMessage(
                    {
                        id: 'navbar_dropdown.versionText',
                        defaultMessage: 'This is the free <link>unsupported</link> edition of Mattermost.',
                    },
                    {
                        link: (msg: React.ReactNode) => (
                            <ExternalLink
                                location='menu_start_trial.unsupported-link'
                                href={LicenseLinks.UNSUPPORTED}
                            >
                                {msg}
                            </ExternalLink>
                        ),
                    },
                )}
            </div>
        </li>
    );
};

export default MenuStartTrial;
