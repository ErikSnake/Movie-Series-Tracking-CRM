
const { v4: uuid } = require("uuid");

module.exports = {
  /**
   * @param{import("sequelize").QueryInterface} queryInterface
   * @return {Promise<void>}
   */
  async up(queryInterface) {
    const createdAt = new Date();
    const updatedAt = new Date();

    /** @type {Map<string, string>} */
    const idMap = new Map();

    /**
     * @param {string} key
     * @return {string}
     */
    function getId(key) {
      if (idMap.has(key)) {
        return idMap.get(key);
      }
      const id = uuid();
      idMap.set(key, id);
      return id;
    }

    await queryInterface.bulkInsert("roles", [
      
      
      { id: getId("Administrator"), name: "Administrator", createdAt, updatedAt },
      
      
        
          { id: getId("SystemOwner"), name: "System Owner", createdAt, updatedAt },
        
          { id: getId("ContentCurator"), name: "Content Curator", createdAt, updatedAt },
        
          { id: getId("DataManager"), name: "Data Manager", createdAt, updatedAt },
        
          { id: getId("ViewerPlus"), name: "Viewer Plus", createdAt, updatedAt },
        
          { id: getId("Viewer"), name: "Viewer", createdAt, updatedAt },
        
      
      
      { id: getId("Public"), name: "Public", createdAt, updatedAt },
    ]);

    /**
     * @param {string} name
     */
    function createPermissions(name) {
      return [
        { id: getId(`CREATE_${name.toUpperCase()}`), createdAt, updatedAt, name: `CREATE_${name.toUpperCase()}` },
        { id: getId(`READ_${name.toUpperCase()}`), createdAt, updatedAt, name: `READ_${name.toUpperCase()}` },
        { id: getId(`UPDATE_${name.toUpperCase()}`), createdAt, updatedAt, name: `UPDATE_${name.toUpperCase()}` },
        { id: getId(`DELETE_${name.toUpperCase()}`), createdAt, updatedAt, name: `DELETE_${name.toUpperCase()}` }
      ];
    }

    const entities = [
      "users","roles","permissions","franchises","titles","seasons","episodes","watch_entries","watchlist_items","tags","title_tags","attachments",,
    ];
await queryInterface.bulkInsert("permissions", entities.flatMap(createPermissions));
await queryInterface.bulkInsert("permissions", [{ id: getId(`READ_API_DOCS`), createdAt, updatedAt, name: `READ_API_DOCS` }]);
await queryInterface.bulkInsert("permissions", [{ id: getId(`CREATE_SEARCH`), createdAt, updatedAt, name: `CREATE_SEARCH`}]);


await queryInterface.sequelize.query(`create table "rolesPermissionsPermissions"
(
"createdAt"           timestamp with time zone not null,
"updatedAt"           timestamp with time zone not null,
"roles_permissionsId" uuid                     not null,
"permissionId"        uuid                     not null,
primary key ("roles_permissionsId", "permissionId")
);`);


await queryInterface.bulkInsert("rolesPermissionsPermissions", [
    
    
      
      
          
                
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('CREATE_USERS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('READ_USERS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('UPDATE_USERS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('DELETE_USERS') },
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ContentCurator"), permissionId: getId('READ_USERS') },
                    
                  
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("DataManager"), permissionId: getId('READ_USERS') },
                    
                  
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ViewerPlus"), permissionId: getId('READ_USERS') },
                    
                  
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("Viewer"), permissionId: getId('READ_USERS') },
                    
                  
                    
                  
                    
                  
                  
             
          
    
  
    
    
    
    
      
      
          
                
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('CREATE_FRANCHISES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('READ_FRANCHISES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('UPDATE_FRANCHISES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('DELETE_FRANCHISES') },
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ContentCurator"), permissionId: getId('CREATE_FRANCHISES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ContentCurator"), permissionId: getId('READ_FRANCHISES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ContentCurator"), permissionId: getId('UPDATE_FRANCHISES') },
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("DataManager"), permissionId: getId('READ_FRANCHISES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("DataManager"), permissionId: getId('UPDATE_FRANCHISES') },
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ViewerPlus"), permissionId: getId('READ_FRANCHISES') },
                    
                  
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("Viewer"), permissionId: getId('READ_FRANCHISES') },
                    
                  
                    
                  
                    
                  
                  
             
          
    
  
    
    
      
      
          
                
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('CREATE_TITLES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('READ_TITLES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('UPDATE_TITLES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('DELETE_TITLES') },
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ContentCurator"), permissionId: getId('CREATE_TITLES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ContentCurator"), permissionId: getId('READ_TITLES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ContentCurator"), permissionId: getId('UPDATE_TITLES') },
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("DataManager"), permissionId: getId('READ_TITLES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("DataManager"), permissionId: getId('UPDATE_TITLES') },
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ViewerPlus"), permissionId: getId('READ_TITLES') },
                    
                  
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("Viewer"), permissionId: getId('READ_TITLES') },
                    
                  
                    
                  
                    
                  
                  
             
          
    
  
    
    
      
      
          
                
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('CREATE_SEASONS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('READ_SEASONS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('UPDATE_SEASONS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('DELETE_SEASONS') },
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ContentCurator"), permissionId: getId('CREATE_SEASONS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ContentCurator"), permissionId: getId('READ_SEASONS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ContentCurator"), permissionId: getId('UPDATE_SEASONS') },
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("DataManager"), permissionId: getId('READ_SEASONS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("DataManager"), permissionId: getId('UPDATE_SEASONS') },
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ViewerPlus"), permissionId: getId('READ_SEASONS') },
                    
                  
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("Viewer"), permissionId: getId('READ_SEASONS') },
                    
                  
                    
                  
                    
                  
                  
             
          
    
  
    
    
      
      
          
                
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('CREATE_EPISODES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('READ_EPISODES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('UPDATE_EPISODES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('DELETE_EPISODES') },
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ContentCurator"), permissionId: getId('CREATE_EPISODES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ContentCurator"), permissionId: getId('READ_EPISODES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ContentCurator"), permissionId: getId('UPDATE_EPISODES') },
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("DataManager"), permissionId: getId('READ_EPISODES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("DataManager"), permissionId: getId('UPDATE_EPISODES') },
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ViewerPlus"), permissionId: getId('READ_EPISODES') },
                    
                  
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("Viewer"), permissionId: getId('READ_EPISODES') },
                    
                  
                    
                  
                    
                  
                  
             
          
    
  
    
    
      
      
          
                
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('CREATE_WATCH_ENTRIES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('READ_WATCH_ENTRIES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('UPDATE_WATCH_ENTRIES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('DELETE_WATCH_ENTRIES') },
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ContentCurator"), permissionId: getId('READ_WATCH_ENTRIES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ContentCurator"), permissionId: getId('UPDATE_WATCH_ENTRIES') },
                    
                  
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("DataManager"), permissionId: getId('CREATE_WATCH_ENTRIES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("DataManager"), permissionId: getId('READ_WATCH_ENTRIES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("DataManager"), permissionId: getId('UPDATE_WATCH_ENTRIES') },
                    
                  
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ViewerPlus"), permissionId: getId('CREATE_WATCH_ENTRIES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ViewerPlus"), permissionId: getId('READ_WATCH_ENTRIES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ViewerPlus"), permissionId: getId('UPDATE_WATCH_ENTRIES') },
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("Viewer"), permissionId: getId('READ_WATCH_ENTRIES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("Viewer"), permissionId: getId('UPDATE_WATCH_ENTRIES') },
                    
                  
                    
                  
                  
             
          
    
  
    
    
      
      
          
                
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('CREATE_WATCHLIST_ITEMS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('READ_WATCHLIST_ITEMS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('UPDATE_WATCHLIST_ITEMS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('DELETE_WATCHLIST_ITEMS') },
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ContentCurator"), permissionId: getId('READ_WATCHLIST_ITEMS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ContentCurator"), permissionId: getId('UPDATE_WATCHLIST_ITEMS') },
                    
                  
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("DataManager"), permissionId: getId('CREATE_WATCHLIST_ITEMS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("DataManager"), permissionId: getId('READ_WATCHLIST_ITEMS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("DataManager"), permissionId: getId('UPDATE_WATCHLIST_ITEMS') },
                    
                  
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ViewerPlus"), permissionId: getId('CREATE_WATCHLIST_ITEMS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ViewerPlus"), permissionId: getId('READ_WATCHLIST_ITEMS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ViewerPlus"), permissionId: getId('UPDATE_WATCHLIST_ITEMS') },
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("Viewer"), permissionId: getId('READ_WATCHLIST_ITEMS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("Viewer"), permissionId: getId('UPDATE_WATCHLIST_ITEMS') },
                    
                  
                    
                  
                  
             
          
    
  
    
    
      
      
          
                
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('CREATE_TAGS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('READ_TAGS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('UPDATE_TAGS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('DELETE_TAGS') },
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ContentCurator"), permissionId: getId('CREATE_TAGS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ContentCurator"), permissionId: getId('READ_TAGS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ContentCurator"), permissionId: getId('UPDATE_TAGS') },
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("DataManager"), permissionId: getId('READ_TAGS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("DataManager"), permissionId: getId('UPDATE_TAGS') },
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ViewerPlus"), permissionId: getId('READ_TAGS') },
                    
                  
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("Viewer"), permissionId: getId('READ_TAGS') },
                    
                  
                    
                  
                    
                  
                  
             
          
    
  
    
    
      
      
          
                
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('CREATE_TITLE_TAGS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('READ_TITLE_TAGS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('UPDATE_TITLE_TAGS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('DELETE_TITLE_TAGS') },
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ContentCurator"), permissionId: getId('CREATE_TITLE_TAGS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ContentCurator"), permissionId: getId('READ_TITLE_TAGS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ContentCurator"), permissionId: getId('UPDATE_TITLE_TAGS') },
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("DataManager"), permissionId: getId('READ_TITLE_TAGS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("DataManager"), permissionId: getId('UPDATE_TITLE_TAGS') },
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ViewerPlus"), permissionId: getId('READ_TITLE_TAGS') },
                    
                  
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("Viewer"), permissionId: getId('READ_TITLE_TAGS') },
                    
                  
                    
                  
                    
                  
                  
             
          
    
  
    
    
      
      
          
                
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('CREATE_ATTACHMENTS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('READ_ATTACHMENTS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('UPDATE_ATTACHMENTS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('DELETE_ATTACHMENTS') },
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ContentCurator"), permissionId: getId('CREATE_ATTACHMENTS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ContentCurator"), permissionId: getId('READ_ATTACHMENTS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ContentCurator"), permissionId: getId('UPDATE_ATTACHMENTS') },
                    
                  
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("DataManager"), permissionId: getId('CREATE_ATTACHMENTS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("DataManager"), permissionId: getId('READ_ATTACHMENTS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("DataManager"), permissionId: getId('UPDATE_ATTACHMENTS') },
                    
                  
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ViewerPlus"), permissionId: getId('CREATE_ATTACHMENTS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ViewerPlus"), permissionId: getId('READ_ATTACHMENTS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("ViewerPlus"), permissionId: getId('UPDATE_ATTACHMENTS') },
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("Viewer"), permissionId: getId('READ_ATTACHMENTS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("Viewer"), permissionId: getId('UPDATE_ATTACHMENTS') },
                    
                  
                    
                  
                  
             
          
    
  
    
     
  
      
      
        
            { createdAt, updatedAt, roles_permissionsId: getId("SystemOwner"), permissionId: getId('CREATE_SEARCH') },
        
            { createdAt, updatedAt, roles_permissionsId: getId("ContentCurator"), permissionId: getId('CREATE_SEARCH') },
        
            { createdAt, updatedAt, roles_permissionsId: getId("DataManager"), permissionId: getId('CREATE_SEARCH') },
        
            { createdAt, updatedAt, roles_permissionsId: getId("ViewerPlus"), permissionId: getId('CREATE_SEARCH') },
        
            { createdAt, updatedAt, roles_permissionsId: getId("Viewer"), permissionId: getId('CREATE_SEARCH') },
        
      
      
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_USERS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_USERS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_USERS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_USERS') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_ROLES') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_ROLES') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_ROLES') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_ROLES') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_PERMISSIONS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_PERMISSIONS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_PERMISSIONS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_PERMISSIONS') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_FRANCHISES') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_FRANCHISES') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_FRANCHISES') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_FRANCHISES') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_TITLES') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_TITLES') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_TITLES') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_TITLES') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_SEASONS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_SEASONS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_SEASONS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_SEASONS') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_EPISODES') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_EPISODES') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_EPISODES') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_EPISODES') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_WATCH_ENTRIES') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_WATCH_ENTRIES') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_WATCH_ENTRIES') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_WATCH_ENTRIES') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_WATCHLIST_ITEMS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_WATCHLIST_ITEMS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_WATCHLIST_ITEMS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_WATCHLIST_ITEMS') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_TAGS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_TAGS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_TAGS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_TAGS') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_TITLE_TAGS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_TITLE_TAGS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_TITLE_TAGS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_TITLE_TAGS') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_ATTACHMENTS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_ATTACHMENTS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_ATTACHMENTS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_ATTACHMENTS') },
    
    
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_API_DOCS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_SEARCH') },
    ]);


  await queryInterface.sequelize.query(`UPDATE "users" SET "app_roleId"='${getId("SuperAdmin")}' WHERE "email"='super_admin@flatlogic.com'`);
  await queryInterface.sequelize.query(`UPDATE "users" SET "app_roleId"='${getId("Administrator")}' WHERE "email"='admin@flatlogic.com'`);
  
   
      
      
        
        
           await queryInterface.sequelize.query(`UPDATE "users" SET "app_roleId"='${getId("SystemOwner")}' WHERE "email"='client@hello.com'`);
        await queryInterface.sequelize.query(`UPDATE "users" SET "app_roleId"='${getId("ContentCurator")}' WHERE "email"='john@doe.com'`);
       
      
      

}
};

