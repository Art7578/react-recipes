import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import { Link, useNavigate, useParams, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../axios';

import 'easymde/dist/easymde.min.css';
import css from './AddRecipe.module.css';
import { selectIsAuth } from '../../redux/slices/auth';

export const AddRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [totalTime, setTotalTime] = useState('');
  const [servings, setServings] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [nutritionalInfo, setNutritionalInfo] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const inputFileRef = useRef(null);

  const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert('File upload error!')
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = useCallback((value) => {
    setInstructions(value);
  }, []);

  const ingredientsArray = ingredients.split(',').map(ingredient => ingredient.trim());
  const nutritionaInfoArray = nutritionalInfo.split(',').map(info => info.trim());
  const onSubmit = async () => {
    try {
      const recipeData = {
        title,
        description,
        ingredients: ingredientsArray,
        instructions,
        prep_time: prepTime,
        cook_time: cookTime,
        total_time: totalTime,
        servings: parseInt(servings),
        difficulty,
        nutritional_info: nutritionaInfoArray,
        imageUrl,
      };

      const { data } = isEditing 
        ? await axios.patch(`/recipes/${id}`, recipeData)
        : await axios.post('/recipes', recipeData);

      const _id = isEditing ? id : data._id;

      navigate(`/recipes/${_id}`);
    } catch (err) {
      console.warn(err);
      alert('Error creating recipe!')
    }
  };

  useEffect(() => {
    if (id) {
      axios.get(`/recipes/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setDescription(data.description);
          setIngredients(data.ingredients.join('\n'));
          setInstructions(data.instructions);
          setPrepTime(data.prep_time);
          setCookTime(data.cook_time);
          setTotalTime(data.total_time);
          setServings(data.servings);
          setDifficulty(data.difficulty);
          setNutritionalInfo(data.nutritional_info.join('\n'));
          setImageUrl(data.imageUrl);
        }).catch(err => {
          console.warn(err);
          alert('Error getting recipe!')
        });
    }
  }, [id]); 

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Enter text...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className={css.container}>
      <button className={css.preview_button} onClick={() => inputFileRef.current.click()}>
        Preview
      </button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} style={{ display: 'none' }} />
      {imageUrl && (
        <div className={css.imageContainer}>
          <button className={css.delete_button} onClick={onClickRemoveImage}>
            Delete
          </button>
          <img className={css.image} src={`http://localhost:3001${imageUrl}`} alt="Uploaded" />
        </div>
      )}
      <br />
      <br />
      <input
        className={css.title_input}
        type="text"
        placeholder="Recipe title..."
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        className={css.description_input}
        placeholder="Recipe description..."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <textarea
        className={css.ingredients_input}
        placeholder="Ingredients (one per line)..."
        value={ingredients}
        onChange={e => setIngredients(e.target.value)}
      />
      <input
        className={css.time_input}
        type="text"
        placeholder="Prep time..."
        value={prepTime}
        onChange={e => setPrepTime(e.target.value)}
      />
      <input
        className={css.time_input}
        type="text"
        placeholder="Cook time..."
        value={cookTime}
        onChange={e => setCookTime(e.target.value)}
      />
      <input
        className={css.time_input}
        type="text"
        placeholder="Total time..."
        value={totalTime}
        onChange={e => setTotalTime(e.target.value)}
      />
      <input
        className={css.servings_input}
        type="text"
        placeholder="Servings..."
        value={servings}
        onChange={e => setServings(e.target.value)}
      />
      <input
        className={css.difficulty_input}
        type="text"
        placeholder="Difficulty..."
        value={difficulty}
        onChange={e => setDifficulty(e.target.value)}
      />
      <textarea
        className={css.nutritional_info_input}
        placeholder="Nutritional info (one per line)..."
        value={nutritionalInfo}
        onChange={e => setNutritionalInfo(e.target.value)}
      />
      <SimpleMDE className={css.editor} value={instructions} onChange={onChange} options={options} />
      <div className={css.buttons}>
        <button className={css.submit_button} onClick={onSubmit}>
          {isEditing ? 'Save' : 'Publish'}
        </button>
        <Link to="/">
          <button className={css.cancel_button}>Cancel</button>
        </Link>
      </div>
    </div>
  );
};
