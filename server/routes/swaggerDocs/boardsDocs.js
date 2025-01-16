/**
 * @swagger
 * /api/boards/:
 *   post:
 *     summary: Add a board
 *     description: >
 *       User must send an object containing the following properties:
 *         - **title**: A string between 3 and 50 characters
 *         - **icon**: A string with one of the following values: icon-project, icon-star, icon-loading, icon-puzzlePiece, icon-container, icon-lightning, icon-colors or icon-hexagon
 *         - **background**: A string with one of the following velues: bg-default, bg-1, bg-2, bg-3, bg-4, bg-5, bg-6, bg-7, bg-8, bg-9, bg-10, bg-11, bg-12, bg-13, bg-14, bg-15
 *     tags: [Boards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the board
 *                 minLength: 3
 *                 maxLength: 50
 *                 example: Project One
 *               icon:
 *                 type: string
 *                 description: The icon of the board
 *                 enum: [icon-project, icon-star, icon-loading, icon-puzzlePiece, icon-container, icon-lightning, icon-colors, icon-hexagon]
 *                 example: icon-project
 *               background:
 *                 type: string
 *                 description: The background of the board
 *                 enum: [bg-default, bg-1, bg-2, bg-3, bg-4, bg-5, bg-6, bg-7, bg-8, bg-9, bg-10, bg-11, bg-12, bg-13, bg-14, bg-15]
 *                 example: bg-1
 *     responses:
 *       201:
 *         description: Board added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     board:
 *                       type: object
 *                       example: {background: {value: bg-1, sources: { mobile: https://res.cloudinary.com/mobile/bg-1, tablet: https://res.cloudinary.com/tablet/bg-1, desktop: https://res.cloudinary.com/desktop/bg-1, mobile_2x: https://res.cloudinary.com/mobile_2x/bg-1, tablet_2x: https://res.cloudinary.com/tablet_2x/bg-1, desktop_2x: https://res.cloudinary.com/desktop_2x/bg-1 } }, _id: 674b0617dc99327fbd2cf12b, title: Project One, icon: icon-project, columns: [] }
 *                     boardsList:
 *                       type: array
 *                       example: [{_id: 674b0617dc99327fbd2cf61b, title: Project One, icon: icon-project}, {_id: 321b0617dc99327fbd2cf61b, title: Project Two, icon: icon-lightning}, {_id: 456b0617dc99327fbd2cf61b, title: Project Three, icon: icon-puzzlePiece}]
 *       400:
 *         description: Validation error - the submitted data does not meet the requirements
 *       401:
 *        description: Unauthorized - missing or invalid access cookie/refresh cookie pair
 *       409:
 *         description: Conflict - the title you want to assign is already in use by another board
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/boards/:
 *   get:
 *     summary: Get boards list
 *     description: Get all boards associated with the user
 *     tags: [Boards]
 *     responses:
 *       200:
 *         description: Boards list received successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   example: [{_id: 674b0617dc99327fbd2cf61b, title: Project One, icon: icon-project}, {_id: 321b0617dc99327fbd2cf61b, title: Project Two, icon: icon-lightning}, {_id: 456b0617dc99327fbd2cf61b, title: Project THREE, icon: icon-puzzlePiece}]
 *       401:
 *         description: Unauthorized - missing or invalid access cookie/refresh cookie pair
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/boards/{boardId}:
 *   get:
 *     summary: Get a specific board
 *     description: This endpoint allows user to get a specific board based on the dynamic parameter which is its ID.
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         description: The board's ID
 *     tags: [Boards]
 *     responses:
 *       200:
 *         description: Board received successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   example: {background: {value: bg-1, sources: { mobile: https://res.cloudinary.com/mobile/bg-1, tablet: https://res.cloudinary.com/tablet/bg-1, desktop: https://res.cloudinary.com/desktop/bg-1, mobile_2x: https://res.cloudinary.com/mobile_2x/bg-1, tablet_2x: https://res.cloudinary.com/tablet_2x/bg-1, desktop_2x: https://res.cloudinary.com/desktop_2x/bg-1 } }, _id: 674b0617dc99327fbd2cf12b, title: Project One, icon: icon-project, columns: [] }
 *       400:
 *         description: Cast Error - invalid ID value
 *       401:
 *         description: Unauthorized - missing or invalid access cookie/refresh cookie pair
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/boards/{boardId}:
 *   delete:
 *     summary: Delete a board
 *     description: This endpoint allows user to delete a specific board based on the dynamic parameter which is its ID.
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         description: The board's ID
 *     tags: [Boards]
 *     responses:
 *       200:
 *         description: Board deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: Updated boards list
 *                   example: [{_id: 674b0617dc99327fbd2cf61b, title: Project One, icon: icon-project}, {_id: 321b0617dc99327fbd2cf61b, title: Project Two, icon: icon-lightning}, {_id: 456b0617dc99327fbd2cf61b, title: Project THREE, icon: icon-puzzlePiece}]
 *       400:
 *         description: Cast Error - invalid ID value
 *       401:
 *         description: Unauthorized - missing or invalid access cookie/refresh cookie pair
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/boards/{boardId}:
 *   put:
 *     summary: Update a board
 *     description: >
 *       This endpoint allows user to update a specific board based on the dynamic parameter which is its ID. User must send an object containing the following properties:
 *         - **title**: A string between 3 and 50 characters
 *         - **icon**: A string with one of the following values: icon-project, icon-star, icon-loading, icon-puzzlePiece, icon-container, icon-lightning, icon-colors or icon-hexagon
 *         - **background**: A string with one of the following velues: bg-default, bg-1, bg-2, bg-3, bg-4, bg-5, bg-6, bg-7, bg-8, bg-9, bg-10, bg-11, bg-12, bg-13, bg-14, bg-15
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         description: The board's ID
 *     tags: [Boards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the board
 *                 minLength: 3
 *                 maxLength: 50
 *                 example: Project X
 *               icon:
 *                 type: string
 *                 description: The updated icon of the board
 *                 enum: [icon-project, icon-star, icon-loading, icon-puzzlePiece, icon-container, icon-lightning, icon-colors, icon-hexagon]
 *                 example: icon-star
 *               background:
 *                 type: string
 *                 description: The updated background of the board
 *                 enum: [bg-default, bg-1, bg-2, bg-3, bg-4, bg-5, bg-6, bg-7, bg-8, bg-9, bg-10, bg-11, bg-12, bg-13, bg-14, bg-15]
 *                 example: bg-11
 *     responses:
 *       200:
 *         description: Board updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     board:
 *                       type: object
 *                       description: The updated board
 *                       example: {background: {value: bg-11, sources: { mobile: https://res.cloudinary.com/mobile/bg-11, tablet: https://res.cloudinary.com/tablet/bg-11, desktop: https://res.cloudinary.com/desktop/bg-11, mobile_2x: https://res.cloudinary.com/mobile_2x/bg-11, tablet_2x: https://res.cloudinary.com/tablet_2x/bg-11, desktop_2x: https://res.cloudinary.com/desktop_2x/bg-11 } }, _id: 674b0617dc99327fbd2cf12b, title: Project X, icon: icon-star, columns: [] }
 *                     boardsList:
 *                       type: array
 *                       description: Updated boards list
 *                       example: [{_id: 674b0617dc99327fbd2cf61b, title: Project One, icon: icon-project}, {_id: 321b0617dc99327fbd2cf61b, title: Project Two, icon: icon-lightning}, {_id: 456b0617dc99327fbd2cf61b, title: Project THREE, icon: icon-puzzlePiece}]
 *       400:
 *         description: >
 *           Two possible cases:
 *            - **Cast Error**: invalid ID value
 *            - **Validation error**: the submitted data does not meet the requirements
 *       401:
 *         description: Unauthorized - missing or invalid access cookie/refresh cookie pair
 *       404:
 *         description: Not found
 *       409:
 *         description: Conflict - the title you want to assign is already in use by another board
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/boards/{boardId}/columns:
 *   post:
 *     summary: Add a column
 *     description: >
 *       This endpoint enables the user to add a new column to a designated board. The user is required to provide an object with the following properties:
 *         - **title**: A string between 3 and 50 characters
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         description: The board's ID
 *     tags: [Columns]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the column
 *                 minLength: 3
 *                 maxLength: 50
 *                 example: Column X
 *     responses:
 *       201:
 *         description: Column added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     columns:
 *                       type: array
 *                       description: Updated board's columns
 *                       example: [{title: Column 1, _id: 856b0617dc99327fbd2cf12b, cards: [] }, {title: Column 2, _id: 856b0617dc99327fbd2cf12b, cards: [] }, {title: Column X, _id: 123b0617dc99327fbd2cf12b, cards: [] } ]
 *       400:
 *         description: >
 *           Two possible cases:
 *            - **Cast Error**: invalid ID value
 *            - **Validation error**: missing or invalid data
 *       401:
 *         description: Unauthorized - missing or invalid access cookie/refresh cookie pair
 *       404:
 *         description: Not found
 *       409:
 *         description: Conflict - the title you want to assign is already in use by another column
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/boards/{boardId}/columns:
 *   put:
 *     summary: Update board's columns
 *     description: This endpoint allows the user to update the columns of a specific board. The user must provide an array of objects containing the updated columns.
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         description: The board's ID
 *     tags: [Columns]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               columns:
 *                 type: array
 *                 description: The columns to be updated
 *                 example: [{title: Column 1, _id: 856b0617dc99327fbd2cf12b, cards: [] }, {title: Column 2, _id: 123b0617dc99327fbd2cf30c, cards: [] } ]
 *     responses:
 *       200:
 *         description: Board's columns updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   description: The updated board's columns
 *                   example: [{title: Column 1, _id: 856b0617dc99327fbd2cf12b, cards: [] }, {title: Column 2, _id: 856b0617dc99327fbd2cf12b, cards: [] } ]
 *       400:
 *         description: >
 *           Two possible cases:
 *            - **Cast Error**: invalid ID value
 *            - **Validation error**: missing or invalid data
 *       401:
 *         description: Unauthorized - missing or invalid access cookie/refresh cookie pair
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/boards/{boardId}/columns/{columnId}:
 *   delete:
 *     summary: Delete a column
 *     description: This endpoint enables the user to delete a specific column from a designated board.
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         description: The board's ID
 *       - in: path
 *         name: columnId
 *         required: true
 *         description: The column's ID
 *     tags: [Columns]
 *     responses:
 *       200:
 *         description: Column deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     columns:
 *                       type: array
 *                       description: Updated board's columns
 *                       example: [{title: Column 1, _id: 856b0617dc99327fbd2cf12b, cards: [] }, {title: Column 2, _id: 856b0617dc99327fbd2cf12b, cards: [] }, {title: Column X, _id: 123b0617dc99327fbd2cf12b, cards: [] } ]
 *       400:
 *         description: Cast Error - invalid board's or column's ID
 *       401:
 *         description: Unauthorized - missing or invalid access cookie/refresh cookie pair
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/boards/{boardId}/columns/{columnId}:
 *   patch:
 *     summary: Update a column
 *     description: >
 *       This endpoint enables the user to update a specific column from a designated board. The user is required to provide an object with the following properties:
 *         - **title**: A string between 3 and 50 characters
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         description: The board's ID
 *       - in: path
 *         name: columnId
 *         required: true
 *         description: The column's ID
 *     tags: [Columns]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the column
 *                 minLength: 3
 *                 maxLength: 50
 *                 example: Column New
 *     responses:
 *       200:
 *         description: Column updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     columns:
 *                       type: array
 *                       description: Updated board's columns
 *                       example: [{title: Column New, _id: 856b0617dc99327fbd2cf12b, cards: [] }, {title: Column 2, _id: 856b0617dc99327fbd2cf12b, cards: [] }, {title: Column X, _id: 123b0617dc99327fbd2cf12b, cards: [] } ]
 *       400:
 *         description: >
 *           Two possible cases:
 *            - **Cast Error**: invalid board's or column's ID
 *            - **Validation error**: missing or invalid data
 *       401:
 *         description: Unauthorized - missing or invalid access cookie/refresh cookie pair
 *       404:
 *         description: Not found
 *       409:
 *         description: Conflict - the title you want to assign is already in use by another column
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/boards/{boardId}/columns/{columnId}/cards:
 *   post:
 *     summary: Add a card
 *     description: >
 *       This endpoint allows the user to add a card in a specific column of a designated board. The user is required to provide an object with the following properties:
 *         - **title**: A string between 3 and 50 characters
 *         - **description**: A string between 5 and 400 characters
 *         - **priority**: A string with one of the following values: low, medium, high, or without
 *         - **deadline**: A string with a value of a date that is greater than or equal to today's date
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         description: The board's ID
 *       - in: path
 *         name: columnId
 *         required: true
 *         description: The column's ID
 *     tags: [Cards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the card
 *                 minLength: 3
 *                 maxLength: 50
 *                 example: Card One
 *               description:
 *                 type: string
 *                 description: The description of the card
 *                 minLength: 5
 *                 maxLength: 400
 *                 example: This is card one.
 *               priority:
 *                 type: string
 *                 description: The priority of the card
 *                 enum: [low, medium, high, without]
 *                 example: medium
 *               deadline:
 *                 type: string
 *                 description: The deadline of the card
 *                 example: Nov 30 2024
 *     responses:
 *       201:
 *         description: Card added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     columns:
 *                       type: array
 *                       description: Updated board's columns
 *                       example: [{title: Column 1, _id: 856b0617dc99327fbd2cf12b, cards: [{_id: 67230674dc99327fbd2cf654, title: Card One, description: This is card one, priority: medium, deadline: Sat Nov 30 2024 } ] }, {title: Column 2, _id: 856b0617dc99327fbd2cf12b, cards: [{_id: 67230674dc99327fbd2cf654, title: Card 2, description: The description of task 2, priority: high, deadline: Sat Nov 30 2024 } ] }, {title: Column X, _id: 123b0617dc99327fbd2cf12b, cards: [] } ]
 *       400:
 *         description: >
 *           Two possible cases:
 *            - **Cast Error**: invalid ID value
 *            - **Validation error**: missing or invalid data
 *       401:
 *         description: Unauthorized - missing or invalid access cookie/refresh cookie pair
 *       404:
 *         description: Not found
 *       409:
 *         description: Conflict - the title you want to assign is already in use by another card
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/boards/{boardId}/columns/{columnId}/cards/{cardId}:
 *   delete:
 *     summary: Delete a card
 *     description: >
 *       This endpoint allows the user to delete a specific card from a specific column of a designated board.
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         description: The board's ID
 *       - in: path
 *         name: columnId
 *         required: true
 *         description: The column's ID
 *       - in: path
 *         name: cardId
 *         required: true
 *         description: The card's ID
 *     tags: [Cards]
 *     responses:
 *       200:
 *         description: Card deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     columns:
 *                       type: array
 *                       description: Updated board's columns
 *                       example: [{title: Column 1, _id: 856b0617dc99327fbd2cf12b, cards: [{_id: 67230674dc99327fbd2cf654, title: Card Updated, description: This is updated card, priority: high, deadline: Dec 30 2024 } ] }, {title: Column 2, _id: 856b0617dc99327fbd2cf12b, cards: [{_id: 67230674dc99327fbd2cf654, title: Card 2, description: The description of task 2, priority: high, deadline: Sat Nov 30 2024 } ] }, {title: Column X, _id: 123b0617dc99327fbd2cf12b, cards: [] } ]
 *       400:
 *         description: Cast Error - invalid board's, column's or card's ID
 *       401:
 *         description: Unauthorized - missing or invalid access cookie/refresh cookie pair
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/boards/{boardId}/columns/{columnId}/cards/{cardId}:
 *   patch:
 *     summary: Update a card
 *     description: >
 *       This endpoint allows the user to update a specific card in a specific column of a designated board. The user is required to provide an object with the following properties:
 *         - **title**: A string between 3 and 50 characters
 *         - **description**: A string between 5 and 400 characters
 *         - **priority**: A string with one of the following values: low, medium, high, or without
 *         - **deadline**: A string with a value of a date that is greater than or equal to today's date
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         description: The board's ID
 *       - in: path
 *         name: columnId
 *         required: true
 *         description: The column's ID
 *       - in: path
 *         name: cardId
 *         required: true
 *         description: The card's ID
 *     tags: [Cards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the card
 *                 minLength: 3
 *                 maxLength: 50
 *                 example: Card Updated
 *               description:
 *                 type: string
 *                 description: The updated description of the card
 *                 minLength: 5
 *                 maxLength: 400
 *                 example: This is updated card.
 *               priority:
 *                 type: string
 *                 description: The updated priority of the card
 *                 enum: [low, medium, high, without]
 *                 example: high
 *               deadline:
 *                 type: string
 *                 description: The updated deadline of the card
 *                 example: DEC 30 2024
 *     responses:
 *       200:
 *         description: Card updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     columns:
 *                       type: array
 *                       description: Updated board's columns
 *                       example: [{title: Column 1, _id: 856b0617dc99327fbd2cf12b, cards: [{_id: 67230674dc99327fbd2cf654, title: Card Updated, description: This is updated card, priority: high, deadline: Dec 30 2024 } ] }, {title: Column 2, _id: 856b0617dc99327fbd2cf12b, cards: [{_id: 67230674dc99327fbd2cf654, title: Card 2, description: The description of task 2, priority: high, deadline: Sat Nov 30 2024 } ] }, {title: Column X, _id: 123b0617dc99327fbd2cf12b, cards: [] } ]
 *       400:
 *         description: >
 *           Two possible cases:
 *            - **Cast Error**: invalid ID value
 *            - **Validation error**: missing or invalid data
 *       401:
 *         description: Unauthorized - missing or invalid access cookie/refresh cookie pair
 *       404:
 *         description: Not found
 *       409:
 *         description: Conflict - the title you want to assign is already in use by another card
 *       500:
 *         description: Internal server error
 */
