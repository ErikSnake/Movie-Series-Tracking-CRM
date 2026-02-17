import dayjs from 'dayjs';
import _ from 'lodash';

export default {
    filesFormatter(arr) {
        if (!arr || !arr.length) return [];
        return arr.map((item) => item);
    },
    imageFormatter(arr) {
        if (!arr || !arr.length) return []
        return arr.map(item => ({
            publicUrl: item.publicUrl || ''
        }))
    },
    oneImageFormatter(arr) {
        if (!arr || !arr.length) return ''
        return arr[0].publicUrl || ''
    },
    dateFormatter(date) {
        if (!date) return ''
        return dayjs(date).format('YYYY-MM-DD')
    },
    dateTimeFormatter(date) {
        if (!date) return ''
        return dayjs(date).format('YYYY-MM-DD HH:mm')
    },
    booleanFormatter(val) {
        return val ? 'Yes' : 'No'
    },
    dataGridEditFormatter(obj) {
        return _.transform(obj, (result, value, key) => {
            if (_.isArray(value)) {
                result[key] = _.map(value, 'id');
            } else if (_.isObject(value)) {
                result[key] = value.id;
            } else {
                result[key] = value;
            }
        });
    },
    
        
        usersManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.firstName)
        },
        usersOneListFormatter(val) {
            if (!val) return ''
            return val.firstName
        },
        usersManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.firstName}
            });
        },
        usersOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.firstName, id: val.id}
        },
        
    
        
        rolesManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.name)
        },
        rolesOneListFormatter(val) {
            if (!val) return ''
            return val.name
        },
        rolesManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.name}
            });
        },
        rolesOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.name, id: val.id}
        },
        
    
        
        permissionsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.name)
        },
        permissionsOneListFormatter(val) {
            if (!val) return ''
            return val.name
        },
        permissionsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.name}
            });
        },
        permissionsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.name, id: val.id}
        },
        
    
        
        franchisesManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.name)
        },
        franchisesOneListFormatter(val) {
            if (!val) return ''
            return val.name
        },
        franchisesManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.name}
            });
        },
        franchisesOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.name, id: val.id}
        },
        
    
        
        titlesManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.name)
        },
        titlesOneListFormatter(val) {
            if (!val) return ''
            return val.name
        },
        titlesManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.name}
            });
        },
        titlesOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.name, id: val.id}
        },
        
    
        
        seasonsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.name)
        },
        seasonsOneListFormatter(val) {
            if (!val) return ''
            return val.name
        },
        seasonsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.name}
            });
        },
        seasonsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.name, id: val.id}
        },
        
    
        
        episodesManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.name)
        },
        episodesOneListFormatter(val) {
            if (!val) return ''
            return val.name
        },
        episodesManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.name}
            });
        },
        episodesOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.name, id: val.id}
        },
        
    
        
    
        
    
        
        tagsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.name)
        },
        tagsOneListFormatter(val) {
            if (!val) return ''
            return val.name
        },
        tagsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.name}
            });
        },
        tagsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.name, id: val.id}
        },
        
    
        
    
        
    
}
