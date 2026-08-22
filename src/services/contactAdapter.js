const STORAGE_KEY = 'contactMessages';

const FIELD_RULES = {
  name: {
    minLength: 2,
    message: '请填写至少两个字的称呼',
  },
  contact: {
    minLength: 5,
    message: '请填写可联系到您的电话或微信',
  },
  content: {
    minLength: 6,
    message: '请简单说明想了解的内容',
  },
};

function fieldLength(value) {
  return String(value ?? '').trim().length;
}

function resolveStorage(storage) {
  if (storage) {
    return storage;
  }

  if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
    return globalThis.localStorage;
  }

  return null;
}

function readMessages(storage) {
  try {
    const saved = storage.getItem(STORAGE_KEY);
    const parsed = JSON.parse(saved || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function validateContactMessage(message = {}) {
  const errors = {};

  for (const [field, rule] of Object.entries(FIELD_RULES)) {
    if (fieldLength(message[field]) < rule.minLength) {
      errors[field] = rule.message;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function submitContactMessage(message = {}, storage) {
  const validation = validateContactMessage(message);

  if (!validation.valid) {
    return {
      ok: false,
      reason: 'validation',
      errors: validation.errors,
    };
  }

  const targetStorage = resolveStorage(storage);

  if (targetStorage) {
    try {
      const existingMessages = readMessages(targetStorage);
      existingMessages.push({
        name: String(message.name ?? '').trim(),
        contact: String(message.contact ?? '').trim(),
        content: String(message.content ?? '').trim(),
        submittedAt: new Date().toISOString(),
      });
      targetStorage.setItem(STORAGE_KEY, JSON.stringify(existingMessages));
    } catch {
      return {
        ok: false,
        reason: 'storage',
        errors: {
          storage: '留言暂时无法保存，请稍后再试或通过电话、微信联系我们',
        },
      };
    }
  }

  return { ok: true };
}
