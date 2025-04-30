import Route from '@ioc:Adonis/Core/Route';

const controller = 'ReadFileController';

Route.group(() =>{
  Route.post('read-xlsx', `${controller}.import`);
})
  .prefix('file')
  // .middleware(['auth'])