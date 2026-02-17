import * as icon from '@mdi/js';
import Head from 'next/head'
import React from 'react'
import axios from 'axios';
import type { ReactElement } from 'react'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import BaseIcon from "../components/BaseIcon";
import { getPageTitle } from '../config'
import Link from "next/link";

import { hasPermission } from "../helpers/userPermissions";
import { fetchWidgets } from '../stores/roles/rolesSlice';
import { WidgetCreator } from '../components/WidgetCreator/WidgetCreator';
import { SmartWidget } from '../components/SmartWidget/SmartWidget';
import ContinueWatching from '../components/ContinueWatching';

import { useAppDispatch, useAppSelector } from '../stores/hooks';

const Dashboard = () => {
    const dispatch = useAppDispatch();
    const iconsColor = useAppSelector((state) => state.style.iconsColor);
    const corners = useAppSelector((state) => state.style.corners);
    const cardsStyle = useAppSelector((state) => state.style.cardsStyle);

    const loadingMessage = 'Loading...';

    const [users, setUsers] = React.useState(loadingMessage);
    const [roles, setRoles] = React.useState(loadingMessage);
    const [permissions, setPermissions] = React.useState(loadingMessage);
    const [franchises, setFranchises] = React.useState(loadingMessage);
    const [titles, setTitles] = React.useState(loadingMessage);
    const [seasons, setSeasons] = React.useState(loadingMessage);
    const [episodes, setEpisodes] = React.useState(loadingMessage);
    const [watch_entries, setWatch_entries] = React.useState(loadingMessage);
    const [watchlist_items, setWatchlist_items] = React.useState(loadingMessage);
    const [tags, setTags] = React.useState(loadingMessage);
    const [title_tags, setTitle_tags] = React.useState(loadingMessage);
    const [attachments, setAttachments] = React.useState(loadingMessage);

    const [widgetsRole, setWidgetsRole] = React.useState({
        role: { value: '', label: '' },
    });
    const { currentUser } = useAppSelector((state) => state.auth);
    const { isFetchingQuery } = useAppSelector((state) => state.openAi);
    const { rolesWidgets, loading } = useAppSelector((state) => state.roles);
    
    async function loadData() {
        const entities = ['users','roles','permissions','franchises','titles','seasons','episodes','watch_entries','watchlist_items','tags','title_tags','attachments',];
        const fns = [setUsers,setRoles,setPermissions,setFranchises,setTitles,setSeasons,setEpisodes,setWatch_entries,setWatchlist_items,setTags,setTitle_tags,setAttachments,];

        const requests = entities.map((entity, index) => {
          if(hasPermission(currentUser, `READ_${entity.toUpperCase()}`)) {
            return axios.get(`/${entity.toLowerCase()}/count`);
          } else {
            fns[index](null);
            return Promise.resolve({data: {count: null}});
          }
        });

        Promise.allSettled(requests).then((results) => {
            results.forEach((result, i) => {
                if (result.status === 'fulfilled') {
                    fns[i](result.value.data.count);
                } else {
                    fns[i](result.reason.message);
                }
            });
        });
    }
  
    async function getWidgets(roleId) {
        await dispatch(fetchWidgets(roleId));
    }

    React.useEffect(() => {
        if (!currentUser) return;
        loadData().then();
        setWidgetsRole({ role: { value: currentUser?.app_role?.id, label: currentUser?.app_role?.name } });
    }, [currentUser]);

    React.useEffect(() => {
        if (!currentUser || !widgetsRole?.role?.value) return;
        getWidgets(widgetsRole?.role?.value || '').then();
    }, [widgetsRole?.role?.value]);
  
  return (
    <>
      <Head>
        <title>{getPageTitle('Overview')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
            icon={icon.mdiChartTimelineVariant}
            title='Overview'
            main>
          {''}
        </SectionTitleLineWithButton>

        {/* Cinematic INITIAL DELTA: Continue Watching Widget */}
        <ContinueWatching />
        
        {hasPermission(currentUser, 'CREATE_ROLES') && <WidgetCreator
            currentUser={currentUser}
            isFetchingQuery={isFetchingQuery}
            setWidgetsRole={setWidgetsRole}
            widgetsRole={widgetsRole}
        />}

        {!!rolesWidgets.length &&
            hasPermission(currentUser, 'CREATE_ROLES') && (
                <p className='text-gray-500 dark:text-gray-400 mb-4'>
                    {`${widgetsRole?.role?.label || 'Users'}'s widgets`}
                </p>
            )}

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-4 mb-6 grid-flow-dense'>
            {(isFetchingQuery || loading) && (
                <div className={` ${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 text-lg leading-tight text-gray-500 flex items-center ${cardsStyle} dark:border-dark-700 p-6`}>
                    <BaseIcon
                        className={`${iconsColor} animate-spin mr-5`}
                        w='w-16'
                        h='h-16'
                        size={48}
                        path={icon.mdiLoading}
                    />{' '}
                    Loading widgets...
                </div>
            )}

            { rolesWidgets &&
                rolesWidgets.map((widget) => (
                    <SmartWidget
                        key={widget.id}
                        userId={currentUser?.id}
                        widget={widget}
                        roleId={widgetsRole?.role?.value || ''}
                        admin={hasPermission(currentUser, 'CREATE_ROLES')}
                    />
            ))}
        </div>

        {!!rolesWidgets.length && <hr className='my-6 text-midnightBlueTheme-mainBG' />}
        
        <div id="dashboard" className='grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6'>
            {hasPermission(currentUser, 'READ_USERS') && <Link href={'/users/users-list'}>
                <div className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}>
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight text-gray-500 dark:text-gray-400">Users</div>
                            <div className="text-3xl leading-tight font-semibold">{users}</div>
                        </div>
                        <div>
                            <BaseIcon className={`${iconsColor}`} w="w-16" h="h-16" size={48} path={icon.mdiAccountGroup} />
                        </div>
                    </div>
                </div>
            </Link>}

            {hasPermission(currentUser, 'READ_FRANCHISES') && <Link href={'/franchises/franchises-list'}>
                <div className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}>
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight text-gray-500 dark:text-gray-400">Franchises</div>
                            <div className="text-3xl leading-tight font-semibold">{franchises}</div>
                        </div>
                        <div>
                            <BaseIcon className={`${iconsColor}`} w="w-16" h="h-16" size={48} path={icon.mdiMovieOpenStar} />
                        </div>
                    </div>
                </div>
            </Link>}

            {hasPermission(currentUser, 'READ_TITLES') && <Link href={'/titles/titles-list'}>
                <div className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}>
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight text-gray-500 dark:text-gray-400">Titles</div>
                            <div className="text-3xl leading-tight font-semibold">{titles}</div>
                        </div>
                        <div>
                            <BaseIcon className={`${iconsColor}`} w="w-16" h="h-16" size={48} path={icon.mdiMovie} />
                        </div>
                    </div>
                </div>
            </Link>}

            {hasPermission(currentUser, 'READ_WATCH_ENTRIES') && <Link href={'/watch_entries/watch_entries-list'}>
                <div className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}>
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight text-gray-500 dark:text-gray-400">Watch entries</div>
                            <div className="text-3xl leading-tight font-semibold">{watch_entries}</div>
                        </div>
                        <div>
                            <BaseIcon className={`${iconsColor}`} w="w-16" h="h-16" size={48} path={icon.mdiCheckCircleOutline} />
                        </div>
                    </div>
                </div>
            </Link>}

            {hasPermission(currentUser, 'READ_WATCHLIST_ITEMS') && <Link href={'/watchlist_items/watchlist_items-list'}>
                <div className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}>
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight text-gray-500 dark:text-gray-400">Watchlist items</div>
                            <div className="text-3xl leading-tight font-semibold">{watchlist_items}</div>
                        </div>
                        <div>
                            <BaseIcon className={`${iconsColor}`} w="w-16" h="h-16" size={48} path={icon.mdiPlaylistPlay} />
                        </div>
                    </div>
                </div>
            </Link>}
        </div>
      </SectionMain>
    </>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Dashboard
