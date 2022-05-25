import React, {useEffect, useState} from 'react';
import ContentCardItem from '../ContentCardItem/ContentCardItem';
import ContentAssetItem from '../ContentAssetItem/ContentAssetItem';
import {Draggable, DragDropContext, Droppable} from 'react-beautiful-dnd';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {arrayMoveImmutable} from 'array-move';

// import {Draggable} from 'react-drag-reorder';

function ContentCardList(props) {
  const [characters, updateCharacters] = useState(props.collections);
  let collections, assets;


  if (props.type === 'collections') {
    collections = props.collections.filter(el => {
      if (props.input === '') {
        return el;
      } else {
        return el.name.toLowerCase().includes(props.input);
      }
    });
  }


  if (props.type === 'assets') {
    assets = props.assets.filter(el => {
      if (props.input === '') {
        return el;
      } else {
        return el.displayName.toLowerCase().includes(props.input);
      }
    });
  }

  // function handleOnDragEnd(result) {
  //   if (!result.destination) return;
  //
  //   const items = Array.from(characters);
  //
  //   const [reorderedItem] = items.splice(result.source.index, 1);
  //   items.splice(result.destination.index, 0, reorderedItem);
  //
  //   updateCharacters(items);
  // }

  const SortableItem = SortableElement(({value, index}) => (
    <div className="test-child">
      <ContentCardItem collection={value} key={value.id} index={index}/>
    </div>
  ));

  const SortableList = SortableContainer(({items}) => {
    return (
      <div className="test">
        {items.map((el, index) => (
          <SortableItem value={el} key={el.id} index={index}/>
        ))}
      </div>
    );
  });

  const onSortEnd = ({oldIndex, newIndex}) => {
    const arr = arrayMoveImmutable(characters, oldIndex, newIndex);
    // for (let i = 0; i < arr.length; i++) {
    //   const fromIndex = arr.indexOf(arr[i]);
    //   const el = arr.splice(fromIndex, 0)[0];
    //   arr.splice(i, 0, el);
    // }

    updateCharacters(arr);
  };

  return (
    <>
      {props.type === 'collections' ?
        <SortableList items={characters} onSortEnd={onSortEnd} axis="xy"/> :
        // collections.map((el) => <ContentCardItem collection={el} key={el.id}/>) :
        assets.map((el) => <ContentAssetItem selectAll={props.selectAll} assets={el} key={el.id}/>)

      }
    </>
  );
}

export default ContentCardList;

// <DragDropContext onDragEnd={handleOnDragEnd}>
//   <Droppable droppableId="test" direction="horizontal">
//     {
//       (provided) => (
//         <ol className="test" {...provided.droppableProps} ref={provided.innerRef}>
//           {characters.map((el, index) =>
//             <Draggable key={el.id} draggableId={el.id} index={index}>
//               {(provided) => (
//                 // <div
//                 //   {...provided.draggableProps}
//                 //   {...provided.dragHandleProps}
//                 //   ref={provided.innerRef}
//                 //   // selectAll={props.selectAll}
//                 //   // collection={el}
//                 //   key={el.id}>TEST {index}</div>
//                 <li
//                   className="test-child col-lg-4"
//                   {...provided.draggableProps}
//                   {...provided.dragHandleProps}
//                   ref={provided.innerRef}
//                 >
//
//                   <ContentCardItem
//                     // selectAll={props.selectAll}
//                     collection={el}
//                   />
//                 </li>
//               )}
//             </Draggable>,
//           )}
//           {provided.placeholder}
//         </ol>
//       )}
//   </Droppable>
// </DragDropContext> :