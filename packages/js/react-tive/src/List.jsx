import { useEffect, useState } from 'react';

export const List = ({ list }) => {
  return (
    <div>
      {list.map((item) => {
        return (
          <div key={item.id}>
            <div>{item.title}</div>
            <div>{item.body}</div>
          </div>
        );
      })}
    </div>
  );
};
