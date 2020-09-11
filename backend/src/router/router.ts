import { Router, Request, Response, response } from "express";
import MySQL from "../mysql/mysql";
import { escapeId } from "mysql";

const router = Router();

router.get("/products", (req: Request, res: Response) => {
  const amount = req.query.amount || 1000;
  const query = `
    SELECT * 
    FROM datos_descuentos_buscador_prueba_2_0_csv_gz
    ORDER by vendidos DESC
    LIMIT ${amount} 
  `;

  MySQL.execQuery(query, (err: any, products: object[]) => {
    if (err) {
      res.status(400).json({
        ok: false,
        error: err,
      });
    } else {
      res.json({
        ok: true,
        products,
      });
    }
  });
});

router.get("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const escapedId = MySQL.instance.connection.escape(id);

  const query = `
    SELECT * 
    FROM datos_descuentos_buscador_prueba_2_0_csv_gz
    WHERE id = ${escapedId}
  `;

  MySQL.execQuery(query, (err: any, product: object[]) => {
    if (err) {
      res.status(400).json({
        ok: false,
        error: err,
      });
    } else {
      res.json({
        ok: true,
        product: product[0],
      });
    }
  });
});

router.get("/products/search/:keyword", async (req: Request, res: Response) => {
  const keyword = req.params.keyword;
  const modKey = "'%" + keyword + "%'";

  const searchQuery = `
    SELECT * 
    FROM datos_descuentos_buscador_prueba_2_0_csv_gz
    WHERE tags LIKE LOWER (${modKey})
    OR titulo LIKE (${modKey})
    LIMIT 5
  `;

  const queryHandler = (query: string) => {
    let arr = [];
    MySQL.execQuery(query, (err: any, products: object[]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        res.json({
          ok: true,
          keyword,
          product: products,
        });
        arr = products;
      }
    });
  };

  const insertproductLog = `
  INSERT INTO table_listnames (name, address, tele)
  SELECT * FROM (SELECT 'Rupert', 'Somewhere', '022') AS tmp
  WHERE NOT EXISTS (
      SELECT name FROM table_listnames WHERE name = 'Rupert'
  ) LIMIT 1;
  `;

  queryHandler(searchQuery);
});

router.get("/products/count/:key/:id", (req: Request, res: Response) => {
  const product = req.params.key;
  const idProduct = req.params.id;
  console.log(product, idProduct);

  const findAndCount = (keyword: string, idProduct: any) =>
    `CALL findAndCount(${keyword}, ${idProduct})`;

  const queryHandler = (query: string) => {
    let arr = [];
    MySQL.execQuery(query, (err: any, products: object[]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        res.json({
          ok: true,
          product: products,
        });
        arr = products;
      }
    });
  };

  queryHandler(findAndCount(product, idProduct));
});

export default router;
