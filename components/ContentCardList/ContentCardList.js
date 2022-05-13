import React, {useEffect, useState} from 'react';
import ContentCardItem from '../ContentCardItem/ContentCardItem';
import ContentAssetItem from '../ContentAssetItem/ContentAssetItem';
import {Draggable, DragDropContext, Droppable} from 'react-beautiful-dnd';

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

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);

    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  return (
    <>
      {props.type === 'collections' ?
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="collections">
            {
              (provided) => (
                <div className="collections test" {...provided.droppableProps} ref={provided.innerRef}>
                  {characters.map((el, index) =>
                    <Draggable key={el.id} draggableId={el.id} index={index}>
                      {(provided) => (
                        // <div
                        //   {...provided.draggableProps}
                        //   {...provided.dragHandleProps}
                        //   ref={provided.innerRef}
                        //   // selectAll={props.selectAll}
                        //   // collection={el}
                        //   key={el.id}>TEST {index}</div>
                        <div
                          className='test-child'
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >

                          <ContentCardItem
                            // selectAll={props.selectAll}
                            collection={el}
                          />
                        </div>
                      )}
                    </Draggable>,
                  )}
                  {provided.placeholder}
                </div>
              )}
          </Droppable>
        </DragDropContext> :
        assets.map((el) => <ContentAssetItem selectAll={props.selectAll} assets={el} key={el.id}/>)

      }
    </>
  );
}

export default ContentCardList;