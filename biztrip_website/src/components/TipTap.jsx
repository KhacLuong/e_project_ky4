import React from 'react';
import {EditorContent} from '@tiptap/react'
import {
    FaBold,
    FaItalic,
    FaStrikethrough,
    FaListOl,
    FaListUl,
    FaQuoteLeft,
    FaRedo,
    FaUnderline,
    FaUndo,
} from "react-icons/fa";
import {MdOutlineWrapText, MdOutlineFormatAlignLeft, MdOutlineFormatAlignRight, MdOutlineFormatAlignCenter, MdOutlineFormatAlignJustify, MdFormatIndentIncrease, MdFormatIndentDecrease} from "react-icons/md";

const TipTap = ({editor}) => {
    return (
        <div className={`text-editor mt-2`}>
            <div
                className={`menu-bar `}>
                <MenuBarTipTap editor={editor}/>
            </div>
            <EditorContent editor={editor}/>
        </div>
    );
};
const MenuBarTipTap = ({editor}) => {
    const handleOptionChange = (event) => {
        const value = event.target.value;
        switch (value) {
            case 'paragraph':
                editor.chain().focus().setParagraph().run();
                break;
            case 'heading-1':
                editor.chain().focus().toggleHeading({level: 1}).run();
                break;
            // Add more cases for additional options
            case 'heading-2':
                editor.chain().focus().toggleHeading({level: 2}).run();
                break;
            // Add more cases for additional options
            case 'heading-3':
                editor.chain().focus().toggleHeading({level: 3}).run();
                break;
            // Add more cases for additional options
            case 'heading-4':
                editor.chain().focus().toggleHeading({level: 4}).run();
                break;
            // Add more cases for additional options
            case 'heading-5':
                editor.chain().focus().toggleHeading({level: 5}).run();
                break;
            // Add more cases for additional options
            case 'heading-6':
                editor.chain().focus().toggleHeading({level: 6}).run();
                break;
            // Add more cases for additional options
            default:
                editor.chain().focus().setParagraph().run();
                break;
        }
    }
    if (!editor) {
        return null
    }
    return (
        <>
            <button title={`bold`}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleBold()
                            .run()
                    }
                    className={editor.isActive('bold') ? 'is-active' : ''}
            >
                <FaBold/>
            </button>
            <button title={`italic`}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleItalic()
                            .run()
                    }
                    className={editor.isActive('italic') ? 'is-active' : ''}
            >
                <FaItalic/>
            </button>
            <button title={`underline`}
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleUnderline()
                            .run()
                    }
                    className={editor.isActive('underline') ? 'is-active' : ''}
            >
                <FaUnderline/>
            </button>
            <button title={`strike`}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleStrike()
                            .run()
                    }
                    className={editor.isActive('strike') ? 'is-active' : ''}
            >
                <FaStrikethrough/>
            </button>
            <div className="divider"></div>
            <select defaultValue={`paragraph`} onChange={handleOptionChange}
                    className="mr-2 bg-gray-50 border border-gray-300 w-44 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
                <option value={`paragraph`}
                        className={editor.isActive('paragraph') ? 'is-active' : ''}>
                    paragraph
                </option>
                <option value={`heading-1`}
                        className={`font-semibold text-2xl ${editor.isActive('heading', {level: 1}) ? 'is-active' : ''}`}>
                    Heading 1
                </option>
                <option value={`heading-2`}
                        className={`font-semibold text-xl ${editor.isActive('heading', {level: 2}) ? 'is-active' : ''}`}>
                    Heading 2
                </option>
                <option value={`heading-3`}
                        className={`font-semibold text-lg ${editor.isActive('heading', {level: 3}) ? 'is-active' : ''}`}>
                    Heading 3
                </option>
                <option value={`heading-4`}
                        className={`font-semibold text-base ${editor.isActive('heading', {level: 4}) ? 'is-active' : ''}`}>
                    Heading 4
                </option>
                <option value={`heading-5`}
                        className={`font-semibold text-sm ${editor.isActive('heading', {level: 5}) ? 'is-active' : ''}`}>
                    Heading 5
                </option>
                <option value={`heading-6`}
                        className={`font-semibold text-xs ${editor.isActive('heading', {level: 6}) ? 'is-active' : ''}`}>
                    Heading 6
                </option>
            </select>
            <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}>
                <MdOutlineFormatAlignLeft className={`w-7 h-7`}/>
            </button>
            <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}>
                <MdOutlineFormatAlignCenter className={`w-7 h-7`}/>
            </button>
            <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}>
                <MdOutlineFormatAlignRight className={`w-7 h-7`}/>
            </button>
            <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}>
                <MdOutlineFormatAlignJustify className={`w-7 h-7`}/>
            </button>
            <button title={`bullet list`}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
                <FaListUl className={`w-7 h-7`}/>
            </button>
            {/*<button*/}
            {/*    onClick={() => editor.chain().focus().splitListItem('listItem').run()}*/}
            {/*    disabled={!editor.can().splitListItem('listItem')}*/}
            {/*>*/}
            {/*    <MdFormatIndentDecrease className={`w-7 h-7`}/>*/}
            {/*</button>*/}
            {/*<button*/}
            {/*    onClick={() => editor.chain().focus().sinkListItem('listItem').run()}*/}
            {/*    disabled={!editor.can().sinkListItem('listItem')}*/}
            {/*>*/}
            {/*    <MdFormatIndentIncrease className={`w-7 h-7`}/>*/}
            {/*</button>*/}
            <button title={`ordered list`}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
                <FaListOl className={`w-7 h-7`}/>
            </button>
            <div className="divider"></div>
            <button title={`blockquote`}
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? 'is-active' : ''}
            >
                <FaQuoteLeft/>
            </button>
            <button title={`hard break`} onClick={() => editor.chain().focus().setHardBreak().run()}>
                <MdOutlineWrapText className={`w-7 h-7`}/>
            </button>
            <div className="divider"></div>
            <button title={`undo`}
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .undo()
                            .run()
                    }
            >
                <FaUndo/>
            </button>
            <button title={`redo`}
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .redo()
                            .run()
                    }
            >
                <FaRedo/>
            </button>
            {/*<button*/}
            {/*    onClick={() => editor.chain().focus().setColor('#958DF1').run()}*/}
            {/*    className={editor.isActive('textStyle', {color: '#958DF1'}) ? 'is-active' : ''}*/}
            {/*>*/}
            {/*    purple*/}
            {/*</button>*/}
        </>
    )
};
export default TipTap;