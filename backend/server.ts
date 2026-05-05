import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/orders', async (req, res) => {
  try {
    const { nom, prenom, email, cin, idAsebem, pack, nombrePersonnes, beneficiaires } = req.body;

    const order = await prisma.order.create({
      data: {
        nom,
        prenom,
        email,
        cin,
        idAsebem,
        pack,
        nombrePersonnes,
        beneficiaires: {
          create: beneficiaires || [],
        },
      },
    });

    res.status(201).json({ success: true, orderId: order.id });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
