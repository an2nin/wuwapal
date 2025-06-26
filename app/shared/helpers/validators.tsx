// Define the structure of the request
interface RequestData {
    recordId: string;
    playerId: string;
    serverId: string;
    cardPoolId: string;
    cardPoolType: number;
    languageCode: string;
}

// Define the structure of validation result
interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

// Helper function to validate UUID format
function validateUUID(value: string): boolean {
    const uuidRegex = /^[a-f0-9]{32}$/i;
    return uuidRegex.test(value);
}

// Helper function to validate language code
function validateLanguageCode(code: string): boolean {
    const languageCodeRegex = /^[a-z]{2}$/i;
    return languageCodeRegex.test(code);
}

// Main validation function
function validateRequest(data: Partial<RequestData>): ValidationResult {
    const errors: string[] = [];

    // Check if all required fields are present
    const requiredFields: (keyof RequestData)[] = [
        'recordId',
        'playerId',
        'serverId',
        'cardPoolId',
        'cardPoolType',
        'languageCode'
    ];

    for (const field of requiredFields) {
        if (!(field in data)) {
            errors.push(`Missing required field: ${field}`);
        }
    }

    // If any required fields are missing, return early
    if (errors.length > 0) {
        return {
            isValid: false,
            errors
        };
    }

    // Now we can safely assert the type since we've checked for all required fields
    const validData = data as RequestData;

    // Validate recordId (32 character hex)
    if (!validateUUID(validData.recordId)) {
        errors.push('Invalid recordId format. Must be a 32 character hexadecimal string');
    }

    // Validate playerId (numeric string)
    if (!/^\d+$/.test(validData.playerId)) {
        errors.push('Invalid playerId format. Must be a numeric string');
    }

    // Validate serverId (32 character hex)
    if (!validateUUID(validData.serverId)) {
        errors.push('Invalid serverId format. Must be a 32 character hexadecimal string');
    }

    // Validate cardPoolId (32 character hex)
    if (!validateUUID(validData.cardPoolId)) {
        errors.push('Invalid cardPoolId format. Must be a 32 character hexadecimal string');
    }

    // Validate cardPoolType (number)
    if (typeof validData.cardPoolType !== 'number' || !Number.isInteger(validData.cardPoolType)) {
        errors.push('Invalid cardPoolType. Must be an integer');
    }

    // Validate languageCode (2 letter code)
    if (!validateLanguageCode(validData.languageCode)) {
        errors.push('Invalid languageCode format. Must be a 2-letter code');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

export function validateJsonString(input: string) {
    try {
        const parsed = JSON.parse(input);
        return validateRequest(parsed);
        
    } catch (error) {
        return {
            isValid: false,
            errors: [error]
        };
    }
}