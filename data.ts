import { Question, Option, Factor } from './types';

// SCL-90 90 Questions
// Note: To be user-friendly, the text is slightly modernized but keeps the scale's intent.
export const questions: Question[] = [
  { id: 1, text: "头痛" },
  { id: 2, text: "神经过敏，心中不踏实" },
  { id: 3, text: "头脑中有不必要的想法或字句盘旋" },
  { id: 4, text: "头昏或昏倒" },
  { id: 5, text: "对异性的兴趣减退" },
  { id: 6, text: "对旁人责备求全" },
  { id: 7, text: "感到别人能控制您的思想" },
  { id: 8, text: "责怪别人制造麻烦" },
  { id: 9, text: "忘性大" },
  { id: 10, text: "担心自己的衣饰整齐及仪态的端正" },
  { id: 11, text: "容易烦恼和激动" },
  { id: 12, text: "胸痛" },
  { id: 13, text: "害怕空旷的场所或街道" },
  { id: 14, text: "感到自己的精力下降，活动减慢" },
  { id: 15, text: "想结束自己的生命" },
  { id: 16, text: "听到旁人听不到的声音" },
  { id: 17, text: "发抖" },
  { id: 18, text: "感到大多数人都不可信" },
  { id: 19, text: "胃口不好，吃得很少" },
  { id: 20, text: "容易哭泣" },
  { id: 21, text: "同异性相处时感到害羞不自在" },
  { id: 22, text: "感到受骗，中了圈套或有人想抓住您" },
  { id: 23, text: "无缘无故地突然感到害怕" },
  { id: 24, text: "自己不能控制地发脾气" },
  { id: 25, text: "怕单独出门" },
  { id: 26, text: "经常责怪自己" },
  { id: 27, text: "腰痛" },
  { id: 28, text: "感到难以完成任务" },
  { id: 29, text: "感到孤独" },
  { id: 30, text: "感到苦闷" },
  { id: 31, text: "过分担忧" },
  { id: 32, text: "对事物不感兴趣" },
  { id: 33, text: "感到害怕" },
  { id: 34, text: "您的感情容易受到伤害" },
  { id: 35, text: "旁人能知道您的私下想法" },
  { id: 36, text: "感到别人不理解您、同情您" },
  { id: 37, text: "感到人们对您不友好，不喜欢您" },
  { id: 38, text: "做事必须做得很慢以保证做得正确" },
  { id: 39, text: "心跳得很厉害" },
  { id: 40, text: "恶心或胃部不舒服" },
  { id: 41, text: "感到比不上别人" },
  { id: 42, text: "肌肉酸痛" },
  { id: 43, text: "感到有人在监视您、谈论您" },
  { id: 44, text: "难以入睡" },
  { id: 45, text: "做事必须反复检查" },
  { id: 46, text: "难以作出决定" },
  { id: 47, text: "怕乘电车、公共汽车、地铁或火车" },
  { id: 48, text: "呼吸有困难" },
  { id: 49, text: "一阵阵发冷或发热" },
  { id: 50, text: "因为感到害怕而避开某些东西、场合或活动" },
  { id: 51, text: "脑子变空了" },
  { id: 52, text: "身体发麻或刺痛" },
  { id: 53, text: "喉咙有梗塞感" },
  { id: 54, text: "感到没有前途没有希望" },
  { id: 55, text: "不能集中注意力" },
  { id: 56, text: "感到身体的某一部分软弱无力" },
  { id: 57, text: "感到紧张或容易紧张" },
  { id: 58, text: "感到手或脚发重" },
  { id: 59, text: "想到死亡的事" },
  { id: 60, text: "吃得太多" },
  { id: 61, text: "当别人看着您或谈论您时感到不自在" },
  { id: 62, text: "有一些不属于您自己的想法" },
  { id: 63, text: "有想打人或伤害他人的冲动" },
  { id: 64, text: "醒得太早" },
  { id: 65, text: "必须反复洗手、点数目或触摸某些东西" },
  { id: 66, text: "睡得不稳不深" },
  { id: 67, text: "有想摔坏或破坏东西的冲动" },
  { id: 68, text: "有一些别人没有的想法或念头" },
  { id: 69, text: "对别人感到过分敏锐" },
  { id: 70, text: "在公共场合或街道上感到害怕" },
  { id: 71, text: "感到一切都觉得很累" },
  { id: 72, text: "心神不定或坐立不安" },
  { id: 73, text: "感到在公共场合吃东西很不舒服" },
  { id: 74, text: "经常与人争论" },
  { id: 75, text: "一独自一人时就感到神经紧张" },
  { id: 76, text: "别人对您的成绩没有作出恰当的评价" },
  { id: 77, text: "即使和别人在一起也感到孤单" },
  { id: 78, text: "感到坐立不宁，无法静下来" },
  { id: 79, text: "感到自己没有什么价值" },
  { id: 80, text: "感到熟悉的地方或人变得陌生或不真实" },
  { id: 81, text: "大叫或摔东西" },
  { id: 82, text: "怕在公共场合昏倒" },
  { id: 83, text: "感到别人想占您的便宜" },
  { id: 84, text: "为一些有关性的念头而很苦恼" },
  { id: 85, text: "您认为应该因为自己的过错而受到惩罚" },
  { id: 86, text: "感到要很快把事情做完" },
  { id: 87, text: "感到自己的身体有严重问题" },
  { id: 88, text: "从未感到和其他人很亲近" },
  { id: 89, text: "感到有罪恶感" },
  { id: 90, text: "感到自己的脑子有毛病" }
];

// 4 Options as requested (Standard SCL-90 has 5, adapted to 4 here)
export const options: Option[] = [
  { label: "从无", value: 1, colorClass: "bg-gray-100 hover:bg-gray-200 text-gray-700" },
  { label: "轻度", value: 2, colorClass: "bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border-yellow-200" },
  { label: "中度", value: 3, colorClass: "bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200" },
  { label: "偏重/严重", value: 4, colorClass: "bg-red-50 hover:bg-red-100 text-red-700 border-red-200" },
];

export const factors: Factor[] = [
  {
    key: "F1",
    name: "躯体化",
    questionIds: [1, 4, 12, 27, 40, 42, 48, 49, 52, 53, 56, 58],
    description: "反映身体不适感，包括心血管、胃肠道、呼吸等系统的主诉不适。"
  },
  {
    key: "F2",
    name: "强迫症状",
    questionIds: [3, 9, 10, 28, 38, 45, 46, 51, 55, 65],
    description: "指那些明知没有必要，但又无法摆脱的无意义的思想、冲动和行为。"
  },
  {
    key: "F3",
    name: "人际关系敏感",
    questionIds: [6, 21, 34, 36, 37, 41, 61, 69, 73],
    description: "主要指某些个人不自在感和自卑感，尤其是在与他人相处时。"
  },
  {
    key: "F4",
    name: "抑郁",
    questionIds: [5, 14, 15, 20, 22, 26, 29, 30, 31, 32, 54, 71, 79],
    description: "反映苦闷的情感和心境，对生活的兴趣减退，缺乏动力，甚至有自杀观念。"
  },
  {
    key: "F5",
    name: "焦虑",
    questionIds: [2, 17, 23, 33, 39, 57, 72, 78, 80, 86],
    description: "指在无实质性恐惧的情况下，产生的主观焦灼、紧张不安。"
  },
  {
    key: "F6",
    name: "敌对",
    questionIds: [11, 24, 63, 67, 74, 81],
    description: "主要从三方面来反映：思想、感情及行为。包括厌烦、争论、摔物等。"
  },
  {
    key: "F7",
    name: "恐怖",
    questionIds: [13, 25, 47, 50, 70, 75, 82],
    description: "引起恐惧的因素包括出门旅行、空旷场地、人群或公共场合等。"
  },
  {
    key: "F8",
    name: "偏执",
    questionIds: [8, 18, 43, 68, 76, 83],
    description: "主要指投射性思维、敌对、猜疑、关系妄想、被动体验和夸大等。"
  },
  {
    key: "F9",
    name: "精神病性",
    questionIds: [7, 16, 35, 62, 77, 84, 85, 87, 88, 90],
    description: "反映各式各样的幻听、思维播散、被控制感等精神分裂样症状。"
  },
  {
    key: "F10",
    name: "其他（睡眠/饮食）",
    questionIds: [19, 44, 59, 60, 64, 66, 89],
    description: "反映睡眠及饮食情况。"
  }
];