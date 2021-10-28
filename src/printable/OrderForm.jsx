import React from 'react';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.png';

const OrderForm = ({ componentRef, lead }) => {
  const inventory = useSelector((state) => state.inventory.inventory);
  const DATA = useSelector((state) => state.contact.update);
  var inventorySku = [];

  lead?.items?.forEach((element) => {
    var inventoryItem = inventory.filter(
      (f) => f?._id === element?.item?._id,
    )[0];
    inventorySku.push({
      _id: inventoryItem?._id,
      sku: inventoryItem?.sku,
      item_name: inventoryItem?.item_name,
      article: inventoryItem?.article,
      sale_price: inventoryItem?.sale_price,
    });
  });

  let totalAmt = 0;

  const item = inventory.filter((f) => f?._id === lead?.item?._id);
  return (
    <div className="hidden">
      <div ref={componentRef}>
        <div className="my-2 px-2 flex justify-between relative ">
          <img className="w-26 absolute" src={logo} alt="" />
          <div className="bg-gradient-to-l from-logo-pink ... w-full text-right text-white p-2">
            <p className="text-lg font-semibold">Nuovo Furnitures</p>
            <p>
              b-17/251, Near State Bank of India, <br /> Bus Stand Rd, Bharat
              Nagar,
            </p>
            <p>Ludhiana, India</p>
            <p>Ph: 9915699052</p>
          </div>
        </div>
        <div className="text-md text-right p-2">
          <p>
            <span className="font-semibold mr-2">Date:</span>
            {new Date().toLocaleString('en-US', {
              month: 'short',
              year: 'numeric',
              day: '2-digit',
            })}
          </p>
          <p>
            <span className="font-semibold mr-2">Deal No.:</span>
            {lead?._id}
          </p>
          <h1 className="text-center mt-6 text-3xl font-semibold">
            Order Form
          </h1>
        </div>
        <div className="px-2 mb-4 mt-4">
          <p className="font-semibold text-lg">{DATA?.company}</p>
          <p className="text-lg">{DATA?.name}</p>
          <p className="text-lg">
            {DATA?.street +
              ', ' +
              DATA?.city +
              ', ' +
              DATA?.state +
              ', ' +
              DATA?.country +
              ', ' +
              DATA?.zipcode}
          </p>
          <p className="text-lg">Mob.:- {DATA?.phone}</p>
        </div>
        <div className="">
          <table>
            <tbody>
              <tr className="bg-logo-pink text-white">
                <th>Article No.</th>
                <th>Colour</th>
                <th>Size</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Amount</th>
              </tr>
              {lead?.items?.map((item, index) => {
                let inven = inventory.filter(
                  (f) => f._id === item?.item?._id,
                )[0];
                let amt =
                  item?.quantity *
                  item?.item?.sale_price *
                  (1 + inven?.gst / 100);
                totalAmt += amt;
                return (
                  <tr>
                    <td>{inven?.article}</td>
                    <td>{inven?.colour}</td>
                    <td>
                      {inven?.length + '*' + inven?.width + '*' + inven?.height}
                    </td>
                    <td>{item?.quantity}</td>
                    <td>
                      ₹
                      {item?.updatedSalePrice > 0
                        ? item?.updatedSalePrice
                        : item?.item?.sale_price}
                    </td>
                    <td>₹{amt}</td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan="4">Payment Details: Cash/Cheque</td>
                <th>Total</th>
                <td>₹{totalAmt}</td>
              </tr>
              <tr>
                <th colSpan="5">
                  <p className="text-right">Advance</p>
                </th>
                <td></td>
              </tr>
              <tr>
                <th colSpan="5">
                  <p className="text-right">Balance</p>
                </th>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <p>
            <span>Terms & Condition: </span>Order once confirmed can not be
            cancelled. <br />
            Transportation changes to client premises shall be borne by client
            on actual basis
          </p>
          <p>
            <span>Payment Terms: </span>50% advance balance 50% at the time of
            delivery
          </p>
        </div>
        <div className="p-2 mt-16 flex justify-between">
          <div className="p-2 text-lg">
            <p>Signature of Representative</p>
          </div>
          <div className="p-2 text-lg">
            <p>Signature of Purchaser</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
