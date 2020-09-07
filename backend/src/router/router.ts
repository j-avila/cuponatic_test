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
    OR titulo like (${modKey})
    LIMIT 5
  `

  const findWord = `
    EXISTS(
      SELECT * 
      FROM products_search_log
      WHERE tags LIKE LOWER (${modKey})
      OR titulo like (${modKey})
      AND NOT EXISTS (
        SELECT * 
        FROM tags_search_log
        WHERE tags LIKE LOWER (${modKey})
        OR titulo like (${modKey})
      )
    )
  `

  const findAndUpdateQuery = `
    EXSITS(
      UPDATE products_search_log
      SET @count := +1 as count
      WHERE products LIKE LOWER(${modKey})
      AND NOT EXISTS (INSERT INTO product_search_log (name, count) VALUES ( ${modKey} , +1 ); )
    )
   
`

  const searchAndUpdate = (query: string) => {
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

  const checkquery: any = searchAndUpdate(findWord)

  // if (checkquery.length >= 1) {
  //   console.log('yay')
  // }

  searchAndUpdate(searchQuery)


})


export default router 