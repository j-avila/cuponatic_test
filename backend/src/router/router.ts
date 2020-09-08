import { Router, Request, Response } from 'express'
import MySQL from '../mysql/mysql';
import { escapeId } from 'mysql';

const router = Router()

router.get('/products', (req: Request, res: Response) => {
  const amount = req.query.amount || 1000
  const query = `
    SELECT * 
    FROM datos_descuentos_buscador_prueba_2_0_csv_gz
    LIMIT ${amount} 
  `;

  MySQL.execQuery(query, (err: any, products: object[]) => {
    if (err) {
      res.status(400).json({
        ok: false,
        error: err
      })
    } else {
      res.json({
        ok: true,
        products
      })
    }
  })

})

router.get('/products/:id', (req: Request, res: Response) => {
  const id = req.params.id
  const escapedId = MySQL.instance.connection.escape(id)

  const query = `
    SELECT * 
    FROM datos_descuentos_buscador_prueba_2_0_csv_gz
    WHERE id = ${escapedId}
  `;

  MySQL.execQuery(query, (err: any, product: object[]) => {
    if (err) {
      res.status(400).json({
        ok: false,
        error: err
      })
    } else {
      res.json({
        ok: true,
        product: product[0]
      })
    }
  })
})

router.get('/products/search/:keyword', async (req: Request, res: Response) => {
  const keyword = req.params.keyword
  const modKey = "'%" + keyword + "%'"

  const searchQuery = `
    SELECT * 
    FROM datos_descuentos_buscador_prueba_2_0_csv_gz
    WHERE tags LIKE LOWER (${modKey})
    OR titulo LIKE (${modKey})
    LIMIT 5
  `
  const findWord = `
    SELECT * 
    FROM datos_descuentos_buscador_prueba_2_0_csv_gz
    WHERE tags LIKE LOWER (${modKey})
  `

  const findAndUpdate = (table: string) => `
    SELECT @id:=id AS id, name, count
    FROM ${table}
    WHERE name = ${modKey};
    
    INSERT INTO ${table} (id, name, count) VALUES (@id, ${keyword}, +1)
    ON DUPLICATE KEY UPDATE count = count + 1;
    SELECT * FROM ${table}
  `

  const queryHandler = (query: string) => {
    MySQL.execQuery(query, (err: any, product: object[]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err
        })
      } else {
        res.json({
          ok: true,
          keyword,
          product: product[0]
        })
      }
    })
  }


  const checkTags: any = queryHandler(searchQuery)

  if (await checkTags) {
    console.log('yay', checkTags)
    queryHandler(findAndUpdate('product_search_logs'))
  } else {
    console.log('ney', queryHandler(searchQuery)
  }



})


export default router 