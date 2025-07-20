def success_response(message="", data=None, status=True):
    return {
        "status": status,
        "message": message,
        "data": data or {}
    }

def error_response(message="", errors=None, status=False):
    return {
        "status": status,
        "message": message,
        "errors": errors or {}
    }
