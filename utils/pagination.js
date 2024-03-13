import response from "./response.js";

const pagination = async (request, reply, DB_NAME, pool) => {
    // get only data inside head of table
    const fields = await pool.query(`SELECT * FROM ${DB_NAME} WHERE 1=0`);
    // result geting data inside head of table
    let get_only_data_inside_head_of_table = Object.fromEntries(Object.entries(request.query).filter(([key]) => fields.fields.map(({name})=> name).includes(key.replace(/_.*/, ''))));
    get_only_data_inside_head_of_table = Object.entries(get_only_data_inside_head_of_table).reduce((acc, [key, value]) => {
      acc[key] = Array.isArray(value) ? value : [value];
      return acc;
    }, {});
    // custom setup
    const keys_of_get_only_data_inside_head_of_table = Object.keys(get_only_data_inside_head_of_table);
  
    let conditions = [];
    let values = [];
    let query = '';
    let query_count = '';
  
    // # Its for ordenary filter
    for (let index_of_keys_response = 0; index_of_keys_response < keys_of_get_only_data_inside_head_of_table.length; index_of_keys_response++) {
      const params_of_get_only_data_inside_head_of_table = keys_of_get_only_data_inside_head_of_table[index_of_keys_response];
      // the values
      switch (params_of_get_only_data_inside_head_of_table.replace(/.*_/, '')) {
        case 'exact':
          conditions.push(`(`);
          for (let item of get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table]) {
            values.push(item);
            conditions.push(`${params_of_get_only_data_inside_head_of_table.replace(/_.*/, '')} = $${values.length} OR `);
            if(get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table].indexOf(item) == get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table].length - 1){
              conditions.pop();
              conditions.push(`${params_of_get_only_data_inside_head_of_table.replace(/_.*/, '')} = $${values.length} ) AND `);
            }
          }
          break;
        case 'except':
          conditions.push(`(`);
          for (let item of get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table]) {
            values.push(item);
            conditions.push(`${params_of_get_only_data_inside_head_of_table.replace(/_.*/, '')} != $${values.length} OR `);
            if(get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table].indexOf(item) == get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table].length - 1){
              conditions.pop();
              conditions.push(`${params_of_get_only_data_inside_head_of_table.replace(/_.*/, '')} != $${values.length} ) AND `);
            }
          }
          break;
        case 'contains':
          conditions.push(`(`);
          for (let item of get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table]) {
            values.push(`%${item}%`);
            conditions.push(`${params_of_get_only_data_inside_head_of_table.replace(/_.*/, '')} like $${values.length} OR `);
            if(get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table].indexOf(item) == get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table].length - 1){
              conditions.pop();
              conditions.push(`${params_of_get_only_data_inside_head_of_table.replace(/_.*/, '')} like $${values.length} ) AND `);
            }
          }
          break;
        case 'icontains':
          conditions.push(`(`);
          for (let item of get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table]) {
            values.push(`%${item}%`);
            conditions.push(`${params_of_get_only_data_inside_head_of_table.replace(/_.*/, '')} ilike $${values.length} OR `);
            if(get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table].indexOf(item) == get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table].length - 1){
              conditions.pop();
              conditions.push(`${params_of_get_only_data_inside_head_of_table.replace(/_.*/, '')} ilike $${values.length} ) AND `);
            }
          }
          break;
        case 'startswith':
          conditions.push(`(`);
          for (let item of get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table]) {
            values.push(`${item}%`);
            conditions.push(`${params_of_get_only_data_inside_head_of_table.replace(/_.*/, '')} like $${values.length} OR `);
            if(get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table].indexOf(item) == get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table].length - 1){
              conditions.pop();
              conditions.push(`${params_of_get_only_data_inside_head_of_table.replace(/_.*/, '')} like $${values.length} ) AND `);
            }
          }
          break;
        case 'istartswith':
          conditions.push(`(`);
          for (let item of get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table]) {
            values.push(`${item}%`);
            conditions.push(`${params_of_get_only_data_inside_head_of_table.replace(/_.*/, '')} ilike $${values.length} OR `);
            if(get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table].indexOf(item) == get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table].length - 1){
              conditions.pop();
              conditions.push(`${params_of_get_only_data_inside_head_of_table.replace(/_.*/, '')} ilike $${values.length} ) AND `);
            }
          }
          break;
        case 'endswith':
          conditions.push(`(`);
          for (let item of get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table]) {
            values.push(`%${item}`);
            conditions.push(`${params_of_get_only_data_inside_head_of_table.replace(/_.*/, '')} like $${values.length} OR `);
            if(get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table].indexOf(item) == get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table].length - 1){
              conditions.pop();
              conditions.push(`${params_of_get_only_data_inside_head_of_table.replace(/_.*/, '')} like $${values.length} ) AND `);
            }
          }
          break;
        case 'iendswith':
          conditions.push(`(`);
          for (let item of get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table]) {
            values.push(`%${item}`);
            conditions.push(`${params_of_get_only_data_inside_head_of_table.replace(/_.*/, '')} ilike $${values.length} OR `);
            if(get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table].indexOf(item) == get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table].length - 1){
              conditions.pop();
              conditions.push(`${params_of_get_only_data_inside_head_of_table.replace(/_.*/, '')} ilike $${values.length} ) AND `);
            }
          }
          break;
        // # its for filter date
        // # Get columns type timestamp from the stored procedure to dynamic filter greater than, greater than equals, less than & less than equals
        case 'gt':
          conditions.push(`(`);
          for (let item of get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table]) {
            values.push(item);
            conditions.push(`${params_of_get_only_data_inside_head_of_table.replace(/_.*/, '')} > $${values.length} OR `);
            if(get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table].indexOf(item) == get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table].length - 1){
              conditions.pop();
              conditions.push(`${params_of_get_only_data_inside_head_of_table.replace(/_.*/, '')} > $${values.length} ) AND `);
            }
          }
          break;
        case 'gte':
          conditions.push(`(`);
          for (let item of get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table]) {
            values.push(item);
            conditions.push(`${params_of_get_only_data_inside_head_of_table.replace(/_.*/, '')} >= $${values.length} OR `);
            if(get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table].indexOf(item) == get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table].length - 1){
              conditions.pop();
              conditions.push(`${params_of_get_only_data_inside_head_of_table.replace(/_.*/, '')} >= $${values.length} ) AND `);
            }
          }
          break;
        case 'lt':
          conditions.push(`(`);
          for (let item of get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table]) {
            values.push(item);
            conditions.push(`${params_of_get_only_data_inside_head_of_table.replace(/_.*/, '')} < $${values.length} OR `);
            if(get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table].indexOf(item) == get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table].length - 1){
              conditions.pop();
              conditions.push(`${params_of_get_only_data_inside_head_of_table.replace(/_.*/, '')} < $${values.length} ) AND `);
            }
          }
          break;
        case 'lte':
          conditions.push(`(`);
          for (let item of get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table]) {
            values.push(item);
            conditions.push(`${params_of_get_only_data_inside_head_of_table.replace(/_.*/, '')} <= $${values.length} OR `);
            if(get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table].indexOf(item) == get_only_data_inside_head_of_table[params_of_get_only_data_inside_head_of_table].length - 1){
              conditions.pop();
              conditions.push(`${params_of_get_only_data_inside_head_of_table.replace(/_.*/, '')} <= $${values.length} ) AND `);
            }
          }
          break;
        default:
          break;
      }
    }
    
    // combine & remove last AND or OR or WHERE
    query = `SELECT * FROM ${DB_NAME} WHERE ${conditions.join('')}`.trim().replace(/(AND|OR|WHERE)\s*$/, '');
    query_count = `SELECT COUNT(*) FROM ${DB_NAME} WHERE ${conditions.join('')}`.trim().replace(/(AND|OR|WHERE)\s*$/, '');
  
    const {order_by_asc, order_by_desc} = request.query;
    if (order_by_asc || order_by_desc) {
      query += " ORDER BY ";
      if (order_by_asc) {
        for (let item of order_by_asc) {
          if (!fields.fields.map(({name})=> name).includes(item)) {
            return response.bad("Invalid order_by parameter", { order_by: `Invalid order_by parameter: ${item}` }, reply);
          }
          query += `${item} ASC, `;
        }
      }
      if (order_by_desc) {
        for (let item of order_by_desc) {
          if (!fields.fields.map(({name})=> name).includes(item)) {
            return response.bad("Invalid order_by parameter", { order_by: `Invalid order_by parameter: ${item}` }, reply);
          }
          query += `${item} DESC, `;
        }
      }
      query = query.slice(0, -2);
    }

    const {page = 1, per_page= 10} = request.query;
    if (page && per_page) {
      query += ` LIMIT ${per_page} OFFSET ${(page - 1) * per_page}`;
    }

    const data = await pool.query(query, values);
    const data_count = await pool.query(query_count, values);

    return { 
      meta: {
        page: page,
        per_page: per_page,
        total: data_count.rows[0].count,
        total_pages: Math.ceil(data_count.rows[0].count / per_page)
      }, 
      data: data.rows 
    }
};

export default pagination;