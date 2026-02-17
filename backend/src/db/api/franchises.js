
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');



const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class FranchisesDBApi {
    

    
    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const franchises = await db.franchises.create(
            {
                id: data.id || undefined,
        
        name: data.name
        ||
        null
            ,
            
        slug: data.slug
        ||
        null
            ,
            
        description: data.description
        ||
        null
            ,
            
        universe: data.universe
        ||
        null
            ,
            
        sort_order: data.sort_order
        ||
        null
            ,
            
        is_active: data.is_active
        ||
        false
        
            ,
            
            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        

        

        
        await FileDBApi.replaceRelationFiles(
            {
                belongsTo: db.franchises.getTableName(),
                belongsToColumn: 'cover_image',
                belongsToId: franchises.id,
            },
            data.cover_image,
            options,
        );
        

        return franchises;
    }
    

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const franchisesData = data.map((item, index) => ({
                id: item.id || undefined,
                
                name: item.name
            ||
            null
            ,
            
                slug: item.slug
            ||
            null
            ,
            
                description: item.description
            ||
            null
            ,
            
                universe: item.universe
            ||
            null
            ,
            
                sort_order: item.sort_order
            ||
            null
            ,
            
                is_active: item.is_active
            ||
            false
        
            ,
            
            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const franchises = await db.franchises.bulkCreate(franchisesData, { transaction });

        // For each item created, replace relation files
        
        for (let i = 0; i < franchises.length; i++) {
            await FileDBApi.replaceRelationFiles(
                {
                    belongsTo: db.franchises.getTableName(),
                    belongsToColumn: 'cover_image',
                    belongsToId: franchises[i].id,
                },
                data[i].cover_image,
                options,
            );
        }
        

        return franchises;
    }

    static async update(id, data,  options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;
        

        const franchises = await db.franchises.findByPk(id, {}, {transaction});


        

        const updatePayload = {};
        
        if (data.name !== undefined) updatePayload.name = data.name;
        
        
        if (data.slug !== undefined) updatePayload.slug = data.slug;
        
        
        if (data.description !== undefined) updatePayload.description = data.description;
        
        
        if (data.universe !== undefined) updatePayload.universe = data.universe;
        
        
        if (data.sort_order !== undefined) updatePayload.sort_order = data.sort_order;
        
        
        if (data.is_active !== undefined) updatePayload.is_active = data.is_active;
        
        
        updatePayload.updatedById = currentUser.id;

        await franchises.update(updatePayload, {transaction});

        
        

        
        

        
        await FileDBApi.replaceRelationFiles(
            {
                belongsTo: db.franchises.getTableName(),
                belongsToColumn: 'cover_image',
                belongsToId: franchises.id,
            },
            data.cover_image,
            options,
        );
        

        return franchises;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const franchises = await db.franchises.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of franchises) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of franchises) {
                await record.destroy({transaction});
            }
        });


        return franchises;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const franchises = await db.franchises.findByPk(id, options);

        await franchises.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await franchises.destroy({
            transaction
        });

        return franchises;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const franchises = await db.franchises.findOne(
            { where },
            { transaction },
        );

        if (!franchises) {
            return franchises;
        }

        const output = franchises.get({plain: true});

        
        
        
        
        
        output.titles_franchise = await franchises.getTitles_franchise({
            transaction
        });
        
        
        
        
        
        
        
        
        
        
        output.cover_image = await franchises.getCover_image({
            transaction
        });
        
        

        return output;
    }

    static async findAll(
          filter,
           options
        ) {
        const limit = filter.limit || 0;
        let offset = 0;
        let where = {};
        const currentPage = +filter.page;

        

        

        offset = currentPage * limit;

        const orderBy = null;

    const transaction = (options && options.transaction) || undefined;

    let include = [



      {
        model: db.file,
        as: 'cover_image',
      },

    ];

        if (filter) {
            if (filter.id) {
                where = {
                    ...where,
                    ['id']: Utils.uuid(filter.id),
                };
            }

            
            if (filter.name) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'franchises',
                        'name',
                        filter.name,
                    ),
                };
            }
            
            if (filter.slug) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'franchises',
                        'slug',
                        filter.slug,
                    ),
                };
            }
            
            if (filter.description) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'franchises',
                        'description',
                        filter.description,
                    ),
                };
            }
            
            if (filter.universe) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'franchises',
                        'universe',
                        filter.universe,
                    ),
                };
            }
            

            
            

            
            if (filter.sort_orderRange) {
                const [start, end] = filter.sort_orderRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    sort_order: {
                    ...where.sort_order,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    sort_order: {
                    ...where.sort_order,
                            [Op.lte]: end,
                    },
                };
                }
            }
            

            if (filter.active !== undefined) {
                where = {
                    ...where,
                    active: filter.active === true || filter.active === 'true'
                };
            }

            
            if (filter.is_active) {
                where = {
                    ...where,
                is_active: filter.is_active,
            };
            }
            




            if (filter.createdAtRange) {
                const [start, end] = filter.createdAtRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.gte]: start,
                        },
                    };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.lte]: end,
                        },
                    };
                }
            }
        }
        

        

        const queryOptions = {
            where,
            include,
            distinct: true,
            order: filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction: options?.transaction,
            logging: console.log
        };

        if (!options?.countOnly) {
            queryOptions.limit = limit ? Number(limit) : undefined;
            queryOptions.offset = offset ? Number(offset) : undefined;
        }

        try {
            const { rows, count } = await db.franchises.findAndCountAll(queryOptions);

            return {
                rows: options?.countOnly ? [] : rows,
                count: count
            };
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    static async findAllAutocomplete(query, limit, offset, ) {
        let where = {};
        
        

        if (query) {
            where = {
                [Op.or]: [
                    { ['id']: Utils.uuid(query) },
                    Utils.ilike(
                        'franchises',
                        'name',
                        query,
                    ),
                ],
            };
        }

        const records = await db.franchises.findAll({
            attributes: [ 'id', 'name' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['name', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.name,
        }));
    }

    
};

