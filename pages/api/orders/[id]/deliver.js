import nc from 'next-connect';
import { isAuth } from '../../../../utils/auth';
import onError from '../../../../utils/error';
import Order from '../../../../models/Order';
import db from '../../../../utils/db';

const handler = nc({
  onError,
});
handler.use(isAuth);
handler.put(async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
    };
    const deliveredOrder = await order.save();
    res.send({ message: 'order delivered', order: deliveredOrder });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'order not found' });
  }
  await db.disconnect();
});

export default handler;
