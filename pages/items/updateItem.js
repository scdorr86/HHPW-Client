import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleItem } from '../../api/itemData';
import NewItemForm from '../../components/ItemForm';

function UpdateItem() {
  const router = useRouter();
  const { itemId } = router?.query;
  const [item, setItem] = useState();

  console.log('item id from route', itemId);

  const getItem = () => {
    getSingleItem(itemId)?.then((data) => {
      setItem(data);
    });
  };

  useEffect(() => {
    getItem();
  }, [itemId]);

  console.log('item from get single item route', item);

  return (
    <>
      <NewItemForm itemObj={item} />
    </>
  );
}

export default UpdateItem;
