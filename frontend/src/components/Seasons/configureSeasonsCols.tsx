import React from 'react';
import BaseIcon from '../BaseIcon';
import { mdiEye, mdiTrashCan, mdiPencilOutline } from '@mdi/js';
import axios from 'axios';
import {
    GridActionsCellItem,
    GridRowParams,
    GridValueGetterParams,
} from '@mui/x-data-grid';
import ImageField from '../ImageField';
import {saveFile} from "../../helpers/fileSaver";
import dataFormatter from '../../helpers/dataFormatter'
import DataGridMultiSelect from "../DataGridMultiSelect";
import ListActionsPopover from '../ListActionsPopover';

import {hasPermission} from "../../helpers/userPermissions";

type Params = (id: string) => void;

export const loadColumns = async (
    onDelete: Params,
    entityName: string,
    
    user
    
) => {
    async function callOptionsApi(entityName: string) {
        
        if (!hasPermission(user, 'READ_' + entityName.toUpperCase())) return [];
        
        try {
        const data = await axios(`/${entityName}/autocomplete?limit=100`);
        return data.data;
        } catch (error) {
         console.log(error);
         return [];
        }
    }
    
    const hasUpdatePermission = hasPermission(user, 'UPDATE_SEASONS')
    
    return [
        
        {
            field: 'series',
            headerName: 'Series',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',
          
            
            editable: hasUpdatePermission,
            
            sortable: false,
            type: 'singleSelect',
            getOptionValue: (value: any) => value?.id,
            getOptionLabel: (value: any) => value?.label,
            valueOptions: await callOptionsApi('titles'),
            valueGetter: (params: GridValueGetterParams) =>
                params?.value?.id ?? params?.value,
          
        },
        
        {
            field: 'season_number',
            headerName: 'SeasonNumber',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',
          
            
            editable: hasUpdatePermission,
            
            type: 'number',
          
        },
        
        {
            field: 'name',
            headerName: 'SeasonName',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',
          
            
            editable: hasUpdatePermission,
            
            
        },
        
        {
            field: 'release_date',
            headerName: 'ReleaseDate',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',
          
            
            editable: hasUpdatePermission,
            
            type: 'dateTime',
            valueGetter: (params: GridValueGetterParams) =>
                new Date(params.row.release_date),
          
        },
        
        {
            field: 'episode_count',
            headerName: 'EpisodeCount',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',
          
            
            editable: hasUpdatePermission,
            
            type: 'number',
          
        },
        
        {
            field: 'overview',
            headerName: 'Overview',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',
          
            
            editable: hasUpdatePermission,
            
            
        },
        
        {
            field: 'sort_order',
            headerName: 'SortOrder',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',
          
            
            editable: hasUpdatePermission,
            
            type: 'number',
          
        },
        
        {
            field: 'actions',
            type: 'actions',
            minWidth: 30,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',
            getActions: (params: GridRowParams) => {
                
               return [
                   <div key={params?.row?.id}>
                      <ListActionsPopover
                      onDelete={onDelete}
                      itemId={params?.row?.id}
                      pathEdit={`/seasons/seasons-edit/?id=${params?.row?.id}`}
                      pathView={`/seasons/seasons-view/?id=${params?.row?.id}`}
                      
                      hasUpdatePermission={hasUpdatePermission}
                      
                    />
                   </div>,
                  ]
            },
        },
    ];
};
