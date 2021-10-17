import React from 'react';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.png';

const Invoice = ({ componentRef, lead }) => {
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

  return (
    <div className="hidden">
      <div ref={componentRef}>
        <div className="my-2 px-2 flex justify-between relative ">
          <img className="w-26 absolute" src={logo} alt="" />
          <div className="bg-gradient-to-l from-logo-pink ... w-full text-right text-white p-2">
            <p className="text-xl font-semibold">Nuovo Furnitures</p>
            <p>
              b-17/251, Near State Bank of India, <br /> Bus Stand Rd, Bharat
              Nagar,
            </p>
            <p>Ludhiana, India</p>
            <p>Ph: 9915699052</p>
          </div>
        </div>
        <h1 className="text-center mt-6 text-4xl font-semibold">Invoice</h1>
        <p className="px-2 pt-4 text-xl font-semibold text-logo-pink">
          Ordered by
        </p>
        <div className="flex justify-between w-3/4 my-2 px-2">
          <div className="text-md">
            <p className="font-semibold">{DATA?.company}</p>
            <p>{DATA?.city}</p>
            <p>{DATA?.state}</p>
          </div>
          <div className="text-md">
            <p>
              <span className="font-semibold mr-2">Date:</span>
              {new Date().toLocaleString('en-US', {
                month: 'short',
                year: 'numeric',
                day: '2-digit',
              })}
            </p>
            <p>
              <span className="font-semibold mr-2">Invoice No.:</span>
              {lead?._id}
            </p>
          </div>
        </div>
        <div className="px-2 mb-4 mt-4">
          <p className="text-lg font-semibold">Representative Contacted:</p>
          <p className="text-md">{DATA?.name}</p>
          <p className="text-md">Mob.:- {DATA?.phone}</p>
        </div>
        <div className="">
          <table>
            <tbody>
              <tr className="bg-logo-pink text-white text-md">
                <th>S.No.</th>
                <th>Item Name</th>
                <th>Remarks</th>
                <th>HSN No.</th>
                <th>Qty</th>
                <th>Price</th>
                <th>GST @18%</th>
                <th>Amount</th>
              </tr>
              {lead?.items.map((item, index) => {
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
                    <td>{index + 1}</td>
                    <td>{inven?.item_name}</td>
                    <td width="10">
                      Size:{' '}
                      {inven?.length + '*' + inven?.width + '*' + inven?.height}
                    </td>
                    <td>{inven?.hsn_code}</td>
                    <td>{item?.quantity}</td>
                    <td>
                      ₹
                      {item?.quantity *
                        (item?.updatedSalePrice > 0
                          ? item?.updatedSalePrice
                          : item?.item?.sale_price)}
                    </td>
                    <td>{inven?.gst}</td>
                    <td>₹{amt}</td>
                  </tr>
                );
              })}
              <tr>
                <th colSpan="7">Total</th>
                <td>₹{totalAmt}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-2">
          <p>For Nuovo Furnitures</p>
          <p>Nuovo Furnitures</p>
          <p>9915699052</p>
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

export default Invoice;
